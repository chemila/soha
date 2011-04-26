<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Home extends Controller_Authenticated {

    public $view;
    public $cache;

    public function action_index()
    {
        $page = $this->request->param('page', 1);

        // Init view cache modules etc.
        $this->view = new View_Smarty('smarty:home/index');
        $this->get_star_caches();

        $model_weibo = new model_weibo;
        $stars_news = $model_weibo->star_news($page, 20);
        $hot_commented = $model_weibo->hot_commented($page, 20);
        $this->user->load();

        $this->view->stars_news = $stars_news;
        $this->view->hot_commented = $hot_commented;
        $this->view->user = $this->user->as_array();
        $this->view->followers = $this->user->attention_list();
        $this->view->friends = $this->user->friends_list();
        $this->view->followers_of_friends = $this->user->followers_of_friends();
        $this->view->inbox = $this->user->inbox();

        $this->request->response = $this->view->render();
    }

    protected function get_star_caches()
    {
        // Parse parameters
        $model_star = new model_star;

        if( ! $stars = $this->cache->get('star:attention:'.$this->user->pk()))
        {
            $stars = $model_star->followed_by($this->user->pk());
            $this->cache->set('star:attention:'.$this->user->pk(), $stars, 24*3600);
        }

        if( ! $stars_count_all = $this->cache->get('star:count:all'))
        {
            $stars_count_all = $model_star->count_all();
            $this->cache->set('star:count:all', $stars_count_all, 3600);
        }

        $this->view->stars = $stars;
        $this->view->stars_count_all = $stars_count_all;
    }


    public function action_profile($uid = NULL)
    {
        $uid = $this->request->param('uid', $uid);

        $user = new Model_User($uid);
    }
}

