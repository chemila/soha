<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
    public $oauth_name = 'sohu';

	public function action_index()
	{
		$this->request->response = 'hey u!';
	}

    public function action_core() {
        $res = Core::find_file('class', 'CE');

        //var_dump(Validate::email('test@@fdsf.com'));
        $this->request->response = Core::debug(Core::config('database'));
    }

    public function action_phpquery() 
    {
        $this->request->response = Core::debug(extension_loaded('mbstring') && phpQuery::$mbstringSupport);
    }

    public function action_database() 
    {
        $res = DB::query(Database::SELECT, 'select * from pin_collect_list order by rand(unix_timestamp()) limit 10')
            ->execute()
            ->as_array();

        $this->request->response = Core::debug($res);
    }

    public function action_oauth_request()
    {
        $oauth = new OAuth($this->oauth_name);

        if($callback_url = $oauth->request_token())
        {
            $this->request->redirect($callback_url);
        }
    }

    public function action_oauth_callback()
    {
        $oauth = new OAuth($this->oauth_name);
        $model_oauth = new model_oauth;

        // verified before: fetch from session or DB instead
        $access_token = $oauth->access_token($_GET['oauth_verifier']);

        $timeline = array(
            'qq' => 'http://open.t.qq.com/api/statuses/home_timeline?f=1&format=json&pageflag=0&reqnum=20&pagetime=0',
            'sohu' => 'http://api.t.sohu.com/statuses/public_timeline.json',
            'sina' => 'http://api.t.sina.com.cn/statuses/home_timeline.json?count=10',
            '163' => 'http://api.t.163.com/statuses/public_timeline.json',
        );

        $params = array();
        if($this->oauth_name == 'qq')
        {
            $params['include_oauth'] = true;
        }

        $response = $oauth->access($timeline[$this->oauth_name], 'get', $access_token, $params);
        $this->request->response = core::debug(json_decode($response));
    }

    public function action_yql()
    {
        set_time_limit(0);

        $url = $_GET['url'];
        $xpath = $_GET['xpath'];
        $base_url =  'http://query.yahooapis.com/v1/public/yql';
        $yql_query = "select * from html where url='{$url}' and xpath='{$xpath}'";
        $yql_query_url = $base_url."?q=".urlencode($yql_query)."&format=json";
        echo $yql_query_url."<br>";
        $response = file_get_contents($yql_query_url);
        $this->request->response = core::debug(json_decode($response, true));
    }

    public function action_memcached()
    {
        $memc = cache::instance('memcache');
        $memc->set('test', 'hello world');

        $this->request->response = $memc->get('test');
    }

    public function timeline()
    {
        $model_auth = new model_auth();

        // Fetch access token first
        $data = $model_auth->timeline($access_token);

        $view = new View_Smarty('smarty:test/index');
        $view->data = $data;

        $this->request->response = $view->render();
    }
} // End Welcome
