<?php defined('SYSPATH') or die('No direct script access.');

class Controller_User extends Controller_Authenticated {

    public function action_index()
    {
        $this->init_view('swirl', 'shared');
        $this->view->type = 'user';
        $this->view->version = $this->user->pk();
    }
}
