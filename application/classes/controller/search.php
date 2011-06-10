<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Search extends Controller_Base
{
    public function action_index()
    {
        $key = Arr::get($_POST, 's', 1);

        $this->init_view('stars', 'public');
        $star = new model_star;
        $stars = $star->search_en_prefix($key);
        $this->view->stars = array_chunk($stars, 3);
    }

    public function action_key()
    {
        $key = Arr::get($_POST, 's', 1);

        $this->init_view('stars', 'public');
        $star = new model_star;
        $stars = $star->search_key($key);
		$this->view->stars = array_chunk($stars, 3);
    }
}
