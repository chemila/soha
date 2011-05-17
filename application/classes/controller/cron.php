<?php defined('SYSPATH') or die('No direct script access.');
define('SUPPRESS_REQUEST', true);

class Controller_Cron extends Controller {
    public function before()
    {
        //TODO: Do check client ip, protocal, is client first
        return parent::before();
    }

    public function action_run()
    {
        // Setting cron jobs here
        Cron::set('queue_inbox', array('* * * * *', array($this, 'queue_inbox')));
        Cron::set('queue_inbox_trash', array('* * * * *', array($this, 'queue_inbox_trash')));
        Cron::set('queue_outbox', array('* * * * *', array($this, 'queue_outbox')));
        Cron::set('queue_outbox_trash', array('* * * * *', array($this, 'queue_outbox_trash')));
        Cron::set('queue_atme', array('* * * * *', array($this, 'queue_atme')));
        Cron::set('queue_atme_trash', array('* * * * *', array($this, 'queue_atme_trash')));
        Cron::set('collect_weibo_oauth', array('*/10 * * * *', array($this, 'collect_weibo_oauth')));
        Cron::set('queue_weibo', array('* * * * *', array($this, 'queue_weibo')));
        Cron::set('observe_star', array('* */2 * * *', array($this, 'observe_star')));
	    Cron::run();
    }

    public function queue_inbox()
    {
        try
        {
            $inbox = new Model_Inbox;
            $inbox->pull(500);
        }
        catch(Exception $e){}
    }
    
	public function queue_inbox_trash()
    {
        try
        {
            $inbox = new Model_Inbox;
            $inbox->clear_trash();
        }
        catch(Exception $e) {}
    }
    
	public function queue_outbox()
    {
        try
        {
            $outbox = new Model_Outbox;
            $outbox->pull(500);
        }
        catch(Exception $e) {}
    }
    
	public function queue_outbox_trash()
    {
        try
        {
            $outbox = new Model_Outbox;
            $outbox->clear_trash();
        }
        catch(Exception $e){}
    }
    
    public function queue_atme()
    {
        try
        {
            $atbox = new Model_Atme();
            $atbox->pull();
        }
        catch(Exception $e) {}
    }

	public function queue_atme_trash()
    {
        try
        {
            $atme = new Model_Atme;
            $atme->clear_trash();
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
                    'count' => 200,
                    'since_id' => $since_id,
                ));

                foreach($data as $status)
                {
                    try
                    {
                        $weibo->fetch($status, $source);
                    }
                    catch(Database_Exception $e){}
                }
            }
        }
    }

    public function queue_weibo($page = 1)
    {
        $weibo_shadow = new Model_Collect_Weibo;
        $shadows = $weibo_shadow->todo(0, $page, 100);

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
            if($source != 'qq')
                continue;
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

    public function action_test()
    {
        //$this->observe_star();
        //$this->collect_weibo_oauth();
        //$this->queue_weibo();
        $this->queue_inbox();
        $this->queue_outbox();
    }
}
