<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Home extends Controller_Authenticated {

    public $view;
    public $cache;

    public function action_index()
    {
        $page = max(1, $this->request->param('page', Arr::get($_GET, 'page', 1)));

        // Init view cache modules etc.
        $this->view = new View_Smarty('smarty:home/index');

        $weibo = new Model_Weibo;
        $this->init_user();

        $inbox = $this->user->inbox($page);

        $this->view->feeds = $weibo->get_from_ids($inbox);
        $this->view->count = $this->user->inbox_count();
        $this->view->current_user = $this->user->pk();
        $this->view->title = '最新微博';
        
        $this->request->response = $this->view->render();
    }

    public function action_profile($uid = NULL)
    {
        $uid = $this->request->param('uid', $uid);
        $page = $this->request->param('page', Arr::get($_GET, "page", 1));
        $limit = 30;
        
        $this->view = new View_Smarty('smarty:home/profile');
        $user = $uid ? new Model_User($uid) : $this->user;

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
        	$this->view->followed = $this->user->is_followd_by($uid);
        }
        else 
        {
        	$this->view->show_attention_button = 0;
        }

        $this->view->domain = $_SERVER['HTTP_HOST'];
        $this->view->feeds = $weibo->extend_collection($feeds);
        $this->view->current_user = $this->user->pk();

        $this->request->response = $this->view->render();
    }

    public function action_atme()
    {
        $page = max(1, $this->request->param('page', Arr::get($_GET, 'page', 1)));

        $this->view = new View_Smarty('smarty:home/index');
        $weibo = new Model_Weibo;
        $atme = new Model_Atme;

        $this->init_user();
        
        $this->view->content_title = 0;

        $atme_ids = $atme->by_user($this->user->pk());
        $this->view->feeds = $weibo->get_from_ids($atme_ids);
        $this->view->count = $atme->count_by_user($this->user->pk());
        $this->view->title = '提到我的';

        $this->request->response = $this->view->render();
    }

    protected function init_user(Model_User $user = NULL)
    {
        if( ! $user)
            $user = $this->user;

        $user->load();

        $this->view->user = $user->as_array();
        $this->view->followers = $user->attention_list(1);
        $this->view->general_followers = $user->attention_list(0);
        $this->view->friends = $user->friends_list();
        $this->view->followers_of_friends = $user->followers_of_friends();
    }
}
