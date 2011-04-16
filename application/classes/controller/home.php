<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Home extends Controller {

    public function action_index()
    {
        $page = $this->request->param('page', 1);
        $view = new View_Smarty('smarty:home/index');
        
        $cache = cache::instance('memcache');

        if( ! $stars = $cache->get('star:hot:page:'.$page))
        {
            $model_star = new model_star;
            $stars = $model_star->hot($page, 18);
            $cache->set('star:hot:page:'.$page, $stars, 24*3600);
        }

        if( ! $stars_news = $cache->get('star:weibo:hot:page:'.$page))
        {
            $model_weibo = new model_weibo;
            $stars_news = $model_weibo->star_news($page);
            $cache->set('star:weibo:hot:page:'.$page, $stars_news, 24*3600);
        }

        $view->stars = $stars;
        $view->stars_news = $stars_news;

        $this->request->response = $view->render();
    }
}
