<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Error extends Controller_Base {
    
    public function action_index()
    {
        $this->init_view();
    }

    public function action_404()
    {
        $this->init_view('404_v2');
    }
}
