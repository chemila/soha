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

        $view->stars = $stars;

        $this->request->response = $view->render();
    }
}
