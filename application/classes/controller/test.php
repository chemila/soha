<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
    public $oauth_name = 'sina';

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

    public function action_oauth()
    {
        $user = new model_user(1);
        $oauth = Model_Oauth::instance($user);

        if($callback_url = $oauth->request_token())
        {
            $this->request->redirect($callback_url);
        }
    }

    public function action_oauth_callback()
    {
        $verifier = Arr::get($_GET, 'oauth_verifier', $_GET['oauth_token']);
        
        $user = new model_user(1);
        $oauth = Model_Oauth::instance($user);

        $data = $oauth->access_token($verifier)->public_timeline();

        $view = new View_Smarty('smarty:test/index');
        $view->data = core::debug($data);

        $this->request->response = $view->render();

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

    public function action_mq()
    {
        $mq = Queue::instance();
        $mq->create('mq');

        $mq->send('mq', 'nice');
        $mq->send('mq', 'good');
        $mq->send('mq', 'terrific');

        var_dump($mq->receive('mq'));
        var_dump($mq->receive('mq'));
        var_dump($mq->receive('mq'));
        var_dump($mq->receive('mq'));
        die;
    }
} // End Welcome
