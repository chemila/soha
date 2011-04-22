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

        $this->view->stars_news = $stars_news;
        $this->view->hot_commented = $hot_commented;

        $this->request->response = $this->view->render();
    }

    protected function get_star_caches()
    {
        // Parse parameters
        $model_star = new model_user_star;

        if( ! $stars = $this->cache->get('star:attention:'.$this->user->uid))
        {
            $stars = $model_star->followed_by($this->user->uid);
            $this->cache->set('star:attention:'.$this->user->uid, $stars, 24*3600);
        }

        if( ! $stars_count_all = $this->cache->get('star:count:all'))
        {
            $stars_count_all = $model_star->count_all();
            $this->cache->set('star:count:all', $stars_count_all, 3600);
        }

        $this->view->stars = $stars;
        $this->view->stars_count_all = $stars_count_all;
    }

    public function init_cache()
    {
    }
}

