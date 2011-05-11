<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        var_dump(request::detect_uri());
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

    public function action_mc()
    {
        $memc = cache::instance('memcache');

        $this->request->response = core::debug($memc->get('inbox:1005136'));
    }

    public function action_mq()
    {
        $mq = Queue::instance();
        $mq->create('mq');

        $mq->send('mq', serialize(array('test' => 'terrific', 'uid' => 1003321)));
        var_dump($mq->receive('mq'));
        die;
    }

    public function action_session()
    {
        $sess = Session::instance();
        $res = $sess;

        $this->request->response = core::debug($res);
    }

    public function action_config()
    {
        $path = arr::get($_GET, 'path', 'oauth');
    
        $config = core::config($path);
        var_dump($config);
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

    public function action_user()
    {
        $user = new Model_User(1003321);

        $user->load();
        $user->nick = 'test';
        $info = array(
            'nick' => 'fuqiang',
            'domain_name' => 'set_chemila',
        );
        $user->values($info);
        $star = new Model_Star;
        $star->uid = $user->pk();
        $star->extend($user);
        var_dump($star->as_array());
    }

    public function action_cookie()
    {
        session_start();
        Cookie::set('su', '123321312;'.session_id(), 2592000);
        //Cookie::set('su', $uid.';'.$session->id(), 2592000);
        var_dump(Cookie::get('su'));
    }

    public function action_sync()
    {
        $weibo = new Model_Weibo_plaintext;

        $weibo->content = 'test;';
        $weibo->uid = 1003321;
        $weibo->rid = 0;
        $weibo->comment_count = 0;
        $weibo->forward_count = 0;
        $weibo->created_at = time();
        $weibo->updated_at = time();
        $weibo->src = 0;
        $weibo->timeline = time();
        
        $version = $weibo->save_sync();

        $cache = cache::instance();

        $record = $cache->get('weibo:'.$version);
        var_dump($record);

    }

    public function action_sync_save()
    {
        $mq = queue::instance();

        $to_save = $mq->receive('weibo');

        if( ! $to_save[0]['body'])
        {
            die('nothing in queue');
            return false;
        }

        $to_save = unserialize($to_save[0]['body']);

        if(is_array($to_save))
        {
            $weibo = new model_weibo;

            $weibo->values($to_save);
            $weibo->save();

            var_dump($weibo->as_array());
        }
    }

    public function action_cache_instance()
    {
        $cache = Cache::instance();

        $version = Model_Weibo::get_last_version(true);
        $weibo = Model_Weibo::cache_instance($version);

        var_dump($weibo->as_array());
    }

    public function action_tmp()
    {
        $inbox = new model_inbox(1);
        $res = $inbox->list_columns();

        var_dump($res);
    }

    public function action_inbox()
    {
        $user = new model_user(1000002);
        $inbox = $user->inbox(10, 0);

        $res = $inbox;
        var_dump($res);
    }

    public function action_outbox()
    {
        $user = new model_user(1000002);
        $inbox = $user->outbox(10, 0);

        $res = $inbox;
        var_dump($res->as_array());
    }

    public function action_weibo()
    {
        $weibo = new model_weibo(110);
        $res = $weibo->ats();
        var_dump($res);
    }

    public function action_img()
    {
        $res = Model_Weibo_Image::get_abs_path('test.png', 'small');
        var_dump($res);
    }
} // End Welcome
