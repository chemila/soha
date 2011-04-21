<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        var_dump($_SERVER);
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
        $user = new Model_User(1);
        $oauth = Model_Oauth::instance($user);

        $data = $oauth->public_timeline();

        $view = new View_Smarty('smarty:test/index');
        $view->data = core::debug($data);

        $this->request->response = $view->render();

        if($callback_url = $oauth->request_token())
        {
            $this->request->redirect($callback_url);
        }
    }

    public function action_oauth_callback()
    {
        $verifier = Arr::get($_GET, 'oauth_verifier', $_GET['oauth_token']);
        $src = session::instance()->get('oauth_src', false); 

        if(empty($src))
        {
            $this->request->redirect('error/404');
        }

        $oauth = OAuth::factory($src);
        $access_token = $oauth->access_token($verifier);

        $this->request->response = core::debug($access_token); 
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
        var_dump($mq->receive('mq', 2));
        var_dump($mq->receive('mq'));
        die;
    }

    public function action_session()
    {
        $sess = Session::instance();
        $res = $sess;

        $this->request->response = core::debug($res);
    }

    public function action_tmp()
    {
        $sess = Session::instance('cookie');
        $sess->get('test');

        $this->request->response = core::debug($sess);
    }

    public function action_config()
    {
        $path = arr::get($_GET, 'path', 'oauth');
    
        $config = core::config($path);
        var_dump($config);
    }

    public function action_user()
    {
        $user = new Model_User;
        var_dump($user->get_source_code('sina'));
    }

    public function action_arr()
    {

	    $a1 = array('name' => 'john', 'mood' => 'happy', 'food' => 'bacon');
	  $a2 = array('name' => 'jack', 'food' => 'tacos', 'drink' => 'beer', 'mood' => 'fdsaf');
	 
	  // Overwrite the values of $a1 with $a2
	  $array = Arr::overwrite($a1, $a2);
      var_dump($array);
    }

    public function action_orm()
    {
        $collect = Model_Collect::instance('list');

        var_dump($collect->find_all()->as_array());
    }
} // End Welcome
