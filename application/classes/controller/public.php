<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Public extends Controller {

    public function action_index()
    {
        $page = $this->request->param('page', 1);
        $view = new View_Smarty('smarty:public/index');
        
        $cache = cache::instance('memcache');

        if( ! $stars = $cache->get('star:hot:page:'.$page))
        {
            $model_star = new model_star;
            $stars = $model_star->hot($page, 18);
            $cache->set('star:hot:page:'.$page, $stars, 24*3600);
        }

        $model_weibo = new model_weibo;
        $stars_news = $model_weibo->star_news($page);
        $hot_commented = $model_weibo->hot_commented($page);

        $view->stars = $stars;
        $view->stars_news = $stars_news;
        $view->hot_commented = $hot_commented;

        $this->request->response = $view->render();
    }

    public function action_industry()
    {
    }

    public function action_grass()
    {
    }
}
