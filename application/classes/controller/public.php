<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Public extends Controller_Base
{
    public function action_index()
    {
        $page = $this->get_page();
        $limit = 30;

        $this->init_view();
        $weibo = new Model_Weibo;
        $this->set_cache();

        $news = $weibo->star_news($page, $limit);
        $this->view->count = $weibo->count_last_query();
        $this->view->perpage = $limit;

        $hot = $weibo->hot_commented($page, $limit + 15);
        $this->view->stars_news = $weibo->extend_collection($news);
        $this->view->hot_commented = $weibo->extend_collection($hot);
    }

    protected function set_cache()
    {
        $model_star = new model_star;
        $this->cache = Cache::instance('memcache');

        if( ! $stars = $this->cache->get('star:hot'))
        {
            $stars = $model_star->hot(90);
            $this->cache->set('star:hot', $stars, 24*3600);
        }

        if( ! $stars_count_all = $this->cache->get('star:count_all'))
        {
            $stars_count_all = $model_star->count_all();
            $this->cache->set('star:count_all', $stars_count_all, 24*3600);
        }

        $this->view->stars = array_chunk($stars, 3);
        $this->view->stars_count_all = $stars_count_all;
    }
}
