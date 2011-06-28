<?php defined('SYSPATH') or die('No direct script access.');
define('SUPPRESS_REQUEST', true);

class Controller_Cron extends Controller {
    public function before()
    {
        //TODO: Do check client ip, protocal, is client first
        if( ! in_array(Request::$client_ip, array('127.0.0.1')))
        {
            $this->request->action = 'forbidden';
            return false;
        }

        return parent::before();
    }

    public function action_run()
    {
        set_time_limit(60);
        // Setting cron jobs here
        //Cron::set('queue_inbox', array('* * * * *', array($this, 'queue_inbox')));
        //Cron::set('queue_inbox_trash', array('* * * * *', array($this, 'queue_inbox_trash')));
        //Cron::set('queue_outbox', array('* * * * *', array($this, 'queue_outbox')));
        //Cron::set('queue_outbox_trash', array('* * * * *', array($this, 'queue_outbox_trash')));
        //Cron::set('queue_atme', array('* * * * *', array($this, 'queue_atme')));
        //Cron::set('queue_atme_trash', array('* * * * *', array($this, 'queue_atme_trash')));
        //Cron::set('queue_unread', array('* */2 * * *', array($this, 'queue_unread')));
        //Cron::set('observe_star', array('* */2 * * *', array($this, 'observe_star')));
        Cron::set('collect_weibo_oauth', array('*/5 * * * *', array($this, 'collect_weibo_oauth')));
        Cron::set('queue_weibo', array('* * * * *', array($this, 'queue_weibo')));
        //Cron::set('queue_weibo_publish', array('* * * * *', array($this, 'queue_weibo_publish')));
        Cron::set('upload_weibo_image', array('* * * * *', array($this, 'upload_weibo_image')));
	    Cron::run();
    }

    public function queue_inbox()
    {
        try
        {
            $inbox = new Model_Inbox;
            $inbox->pull(200);
        }
        catch(Exception $e){}
    }
    
	public function queue_inbox_trash()
    {
        try
        {
            $inbox = new Model_Inbox;
            $inbox->clear_trash(30);
        }
        catch(Exception $e) {}
    }
    
	public function queue_outbox()
    {
        try
        {
            $outbox = new Model_Outbox;
            $outbox->pull(200);
        }
        catch(Exception $e) {}
    }
    
	public function queue_outbox_trash()
    {
        try
        {
            $outbox = new Model_Outbox;
            $outbox->clear_trash(30);
        }
        catch(Exception $e){}
    }
    
    public function queue_atme()
    {
        try
        {
            $atbox = new Model_Atme();
            $atbox->pull(200);
        }
        catch(Exception $e) {}
    }

	public function queue_atme_trash()
    {
        try
        {
            $atme = new Model_Atme;
            $atme->clear_trash(30);
        }
        catch(Exception $e) {}
    }

    public function collect_weibo_oauth()
    {
        $config = Core::config('admin')->as_array();

        foreach($config as $source => $admin_ids)
        {
            foreach($admin_ids as $admin_id)
            {
                $token = new Model_User_Token($admin_id);
                $oauth = new OAuth($source, $token->to_access_token());
                $model_oauth = Model_OAuth::factory($oauth);

                $weibo = new Model_Collect_Weibo;
                $since_id = $weibo->last_id($source);

                $data = $model_oauth->home_timeline(array(
                    'count' => 20,
                    'since_id' => $since_id,
                    //'feature' => '2', // Just image
                ));
                if( ! $data)
                    continue;

                foreach($data as $status)
                {
                    try
                    {
                        $weibo->fetch($status, $source);
                    }
                    catch(Database_Exception $e) {}
                }
            }
        }
    }

    public function upload_weibo_image()
    {
        $weibo = new Model_Weibo;
        $not_saved = $weibo->where('type', '=', Model_Weibo::TYPE_IMAGE)
            ->where('source', '=', 'sina')
            ->where('tag', '=', 0)
            ->order_by('id', 'desc')
            ->limit(20)
            ->find_all();

        foreach($not_saved as $obj)
        {
            if( ! $obj->media_data) continue;
            $array = unserialize($obj->media_data);
            $src = Arr::path($array, 'img.src', false);
            $middle = Arr::path($array, 'img.middle', false);

            if($src)
            {
                $array['img']['src'] = Model_Weibo::load($src);
            }
            if($middle)
            {
                $array['img']['middle'] = Model_Weibo::load($middle);
            }

            $obj->media_data = serialize($array);
            $obj->tag = 1;
            $obj->save();

            if($obj->saved()) 
                printf('saved %s to %s<br>', $src, $array['img']['src']);
        }
    }

    public function queue_weibo()
    {
        $weibo_shadow = new Model_Collect_Weibo;
        $shadows = $weibo_shadow->todo(50);

        foreach($shadows as $shadow)
        {
            $weibo = new Model_Weibo;
            $weibo->save_shadow($shadow);
        }
    }

    public function observe_star()
    {
        $config = Core::config('admin')->as_array();

        foreach($config as $source => $admin_ids)
        {
            $model_star = new Model_Star;
            $stars = $model_star->where('source', '=', $source)
                     ->and_where('observer', '=', 0)
                     ->limit(200)
                     ->find_all();

            if( ! $stars)
                continue;

            foreach($admin_ids as $admin_id)
            {
                $token = new Model_User_Token($admin_id);
                
                $oauth = new OAuth($source, $token->to_access_token());
                $model_oauth = Model_OAuth::factory($oauth);

                foreach($stars as $star)
                {
                    $response = $model_oauth->friendships_create(array('unique_id' => $star->suid));             

                    if( ! $response)
                        continue;

                    $star->observer = $admin_id;
                    $star->updated_at = time();

                    $star->save();
                }
            }
        }
    }

	public function queue_unread()
	{
		try
        {
            $unread = new Model_Unread();
            $unread->pull(200);
        }
        catch(Exception $e) {}
	}

    public function queue_weibo_publish()
    {
		try
        {
            $weibo = new Model_Weibo();
            $weibo->pull(60, true);
        }
        catch(Exception $e) {}
    }

    public function action_test()
    {
        /**
        $this->observe_star();
        $this->collect_weibo_oauth();
        $this->queue_weibo();
        $this->queue_inbox();
        $this->queue_outbox();
        $this->queue_inbox_trash();
        $this->queue_unread();
        $this->queue_weibo();
        $this->queue_weibo_publish();
        **/
        $this->upload_weibo_image();
    }

    public function action_forbidden()
    {
        die('forbidden');
    }

    public function photos()
    {
        $config = Core::config('admin')->as_array();

        foreach($config as $source => $admin_ids)
        {
            foreach($admin_ids as $admin_id)
            {
                $token = new Model_User_Token($admin_id);
                $oauth = new OAuth($source, $token->to_access_token());
                $model_oauth = Model_OAuth::factory($oauth);

                $weibo = new Model_Collect_Weibo;
                $since_id = $weibo->last_id($source);

                $data = $model_oauth->home_timeline(array(
                    'count' => 20,
                    'since_id' => $since_id,
                ));

                if( ! $data)
                    continue;

                foreach($data as $status)
                {
                    try
                    {
                        $weibo->fetch($status, $source);
                    }
                    catch(Database_Exception $e) {}
                }
            }
        }
    }
}
