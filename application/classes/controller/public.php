<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Public extends Controller 
{
    public function action_index()
    {
        $page = $this->request->param('page', Arr::get($_GET, 'page', 1));

        // Init view cache modules etc.
        $this->view = new View_Smarty('smarty:public/index');
        $this->get_star_caches();

        $model_weibo = new model_weibo;

        $stars_news = $model_weibo->star_news($page, 20);
        $this->view->count = $model_weibo->count_last_query();

        $hot_commented = $model_weibo->hot_commented($page, 20);

        $this->view->stars_news = $stars_news;
        $this->view->hot_commented = $hot_commented;

        $this->request->response = $this->view->render();
    }

    protected function get_star_caches()
    {
        $model_star = new model_star;
        $this->cache = Cache::instance('memcache');

        if(true or ! $stars = $this->cache->get('star:hot'))
        {
            $stars = $model_star->hot();
            $this->cache->set('star:hot', $stars, 24*3600);
        }

        if( ! $stars_count_all = $this->cache->get('star:count_all'))
        {
            $stars_count_all = $model_star->count_all();
            $this->cache->set('star:count_all', $stars_count_all, 3600);
        }

        $this->view->stars = $stars;
        $this->view->stars_count_all = $stars_count_all;
    }
}
