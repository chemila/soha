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
        $weibo = new Model_Weibo(10003595);
        var_dump($weibo->root->id);
    }

    public function action_user()
    {
        $user = new Model_User(1003321);
        var_dump($user->as_array());

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

        $cache = cache::instance('memcache');

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
        $weibo = new model_weibo(10003655);
        $res = $weibo->extend()->as_array();
        var_dump($res);
    }

    public function action_img()
    {
        $res = Model_Weibo_Image::get_abs_path('test.png', 'small');
        var_dump($res);
    }

    public function action_delete()
    {
        $id = $_GET['id'];

        $weibo = new Model_Weibo($id);
        $weibo->delete();

        var_dump($weibo->as_array());
    }

    public function action_star()
    {
        $star = new Model_Star(array('suid' => 1252373132, 'source' => 'sina'));

        var_dump($star->pk());
    }

    public function action_trash()
    {
        $outbox = new Model_Outbox;
        $res = $outbox->clear_trash();

        var_dump($res);
    }

    public function action_oauth_friendship()
    {
        $src = Arr::get($_GET, 'src', 'sina');
        $token = Core::config('admin')->offsetGet('oauth_'.$src);
        $oauth = new OAuth($src, $token);
        // Fetch userinfo accoss oauth
        $model_oauth = Model_OAuth::factory($oauth);
        $user_info = $model_oauth->user_info();
        var_dump($user_info);
        $data = $model_oauth->friendships_create(array('unique_id' => '1087482387'), 'post');
        var_dump($data);
    }

    public function action_observe()
    {
        $observe = new Model_User_Observe(1002744);
        if( !$observe->admin_id)
        {
            $observe->uid = 1002744;
        }
        $observe->admin_id = 3123;
        $observe->source = 'sina';
        $observe->created_at = time();
        $observe->save();

        var_dump($observe->as_array());
    }

    public function action_collect_weibo()
    {
        $status = array(
            'created_at' => time(),        
            'uid' => 1002744,
            "text"=>"一个存储系统～～～ 姑且认为是标题党",
            "truncated"=>false,
            "retweeted_status"=> array(
                'uid' => 1003321,
                "created_at"=>time(),
                "text"=>"一个存储系统，从高到底设计非常人性，太有爱了！（Via：http://sinaurl.cn/hb5abi）",
                "bmiddle_pic"=>"http://ww2.sinaimg.cn/bmiddle/69b7fcafgw6dc2pwus9ekg.gif",
                "original_pic"=>"http://ww2.sinaimg.cn/large/69b7fcafgw6dc2pwus9ekg.gif",
                "truncated"=>false,
                "in_reply_to_status_id"=>"",
                "in_reply_to_screen_name"=>"",
                "geo"=>null,
                "favorited"=>false,
                "thumbnail_pic"=>"http://ww2.sinaimg.cn/thumbnail/69b7fcafgw6dc2pwus9ekg.gif",
                "in_reply_to_user_id"=>"",
                "id"=>4117314145,
                "source"=>"<a href=\"http://t.sina.com.cn\" rel=\"nofollow\">新浪微博</a>"
            ),
            "in_reply_to_status_id"=>"",
            "in_reply_to_screen_name"=>"",
            "geo"=>null,
            "favorited"=>false,
            "in_reply_to_user_id"=>"",
            "id"=>4120818179,
            "source"=>"<a href=\"http://t.sina.com.cn\" rel=\"nofollow\">新浪微博</a>",
        );

        $weibo = new model_collect_weibo;
        $weibo->fetch($status, '1');

        var_dump($weibo->as_array());
    }

    public function action_has_many()
    {
        $shadow = new model_collect_weibo(9);
        $children = $shadow->children;

        $res = $children->find_all();
        foreach($res as $child)
        {
            var_dump($child->pk());
        }
        //var_dump($res);die;
    }

    public function action_queue_weibo()
    {
        $weibo_shadow = new Model_Collect_Weibo;
        $shadows = $weibo_shadow->todo(0, 1, 2);

        foreach($shadows as $shadow)
        {
            $weibo = new Model_Weibo;
            $weibo->save_shadow($shadow);
        }
    }

    public function action_queue()
    {
        $inbox = new Model_Inbox;
        $inbox->pull(2);
    }
} // End Welcome
