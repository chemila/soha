<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Error extends Controller_Base {
    public function after()
    {
        $this->view->error = Session::instance()->get_once('error');
        return parent::after();
    }
    
    public function action_index()
    {
        $this->init_view();
    }

    public function action_404()
    {
        $this->init_view('index');
    }

    public function action_forbidden()
    {
        $this->init_view('index');
    }
}
