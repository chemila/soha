<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Home extends Controller_Authenticated {

    public function action_index()
    {
        $page = $this->get_page();

        $this->_unread_cache->clear('feed');

        // Init view cache modules etc.
        $this->init_view();
        $this->init_user($this->user);
        $weibo = new Model_Weibo;
        $inbox = $this->user->inbox($page);

        $this->view->feeds = $weibo->get_from_ids($inbox);
        $this->view->count = $this->user->inbox_count();
        $this->view->title = $this->user->nick.'的最新微博';
    }

    public function action_profile()
    {
        $page = $this->get_page();
        $uid = $this->request->param('uid', false);
        $limit = 30;

        $user = $uid ? new Model_User($uid) : $this->user;
        $this->init_view();
        $this->init_user($user);
        $weibo = new Model_Weibo;

        //$outbox = $user->outbox($page);
        //$feeds = $weibo->get_from_ids($outbox);
        //$count = $user->outbox_count();
        $feeds = $weibo->list_by_user($user->pk(), $page, $limit);
        $this->view->count = $weibo->count_last_query();
        $this->view->perpage = $limit;
        
        if($uid && $uid != $this->user->pk())
        {
        	$this->view->show_attention_button = 1;
        	$this->view->followed = $this->user->following_of($uid);
        }
        else 
        {
        	$this->view->show_attention_button = 0;
        }

        $this->view->domain = $_SERVER['HTTP_HOST'];
        $this->view->title = $user->nick.'发布的微博';
        $this->view->feeds = $weibo->extend_collection($feeds);
    }

    public function action_atme()
    {
        $page = $this->get_page();

        $this->init_view('index');
        $this->init_user($this->user);

        $this->_unread_cache->clear('atme');

        $weibo = new Model_Weibo;
        $atme = new Model_Atme;
        
        $atme_ids = $atme->by_user($this->user->pk());
        $this->view->feeds = $weibo->get_from_ids($atme_ids);
        $this->view->count = $atme->count_by_user($this->user->pk());
        $this->view->title = '提到我的微博';
    }
}
