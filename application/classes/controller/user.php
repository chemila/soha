<?php defined('SYSPATH') or die('No direct script access.');

class Controller_User extends Controller_Authenticated {
    public function action_index()
    {
        $query = Arr::get($_GET, 'q', false);

        $this->init_view('swirl', 'shared');
        $this->view->query = $query;
        $this->view->version = 'user';
    }

    public function action_home()
    {
        $this->trigger_error();
    }

    public function action_followers()
    {
        $query = Arr::get($_GET, 'q', false);
        $version = Arr::get($_GET, 'version', 'user');
        $sid = Arr::get($_GET, 's', '0');

        $this->init_view('swirl', 'shared');
        $this->view->sid = $sid;
        $this->view->version = $version;
        $this->view->query = $query;

        if($user = $this->get_current_user())
        {
            $this->view->sid = $user->pk();
        }
    }

    public function action_profile()
    {
        if($uid = $this->request->param('uid'))
        {
            $user = new Model_User($uid);
        }
        else
        {
            $user = $this->get_current_user();
        }

        $user->reload();

        if( ! $user->loaded())
            $this->trigger_error();

        $this->init_view();
        $this->view->user = $user->as_array();
        $this->view->sid = $user->pk();
        $this->view->version = 'profile';
    }
}
