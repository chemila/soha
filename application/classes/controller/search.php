<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Search extends Controller 
{
    public function action_index()
    {
        $key = $this->request->param('key', Arr::get($_POST, 's', 1));

        // Init view cache modules etc.
        $this->view = new View_Smarty('smarty:public/stars');
        $this->get_star_caches($key);

        $this->request->response = $this->view->render();
    }

    protected function get_star_caches($key)
    {
        $model_star = new model_star;
        $this->cache = Cache::instance('memcache');

        if(!$stars = $this->cache->get('star:hot'.$key))
        {
            $stars = $model_star->search_en_prefix($key);
            $this->cache->set('star:hot'.$key, $stars, 24*3600);
        }

        $this->view->stars = array_chunk($stars, 3);
    }
    
    public function action_key()
    {
        $key = $this->request->param('key', Arr::get($_POST, 's', 1));

        // Init view cache modules etc.
        $this->view = new View_Smarty('smarty:public/stars');
        $model_star = new model_star;
        $stars = $model_star->search_key($key);
		$this->view->stars = array_chunk($stars, 3);
        $this->request->response = $this->view->render();
    }
}
