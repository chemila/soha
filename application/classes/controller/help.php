<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Help extends Controller_Base {

    public function action_index()
    {
        $this->init_view();
		$this->cache = Cache::instance('memcache');
        $this->get_star_caches();
    }
    
    protected function get_star_caches()
    {
        $model_star = new model_star;

        if(! $stars_count_all = $this->cache->get('star:count:all'))
        {
            $stars_count_all = $model_star->count_all();
            $this->cache->set('star:count:all', $stars_count_all, 3600);
        }

        $this->view->stars_count_all = $stars_count_all;
    }
}

