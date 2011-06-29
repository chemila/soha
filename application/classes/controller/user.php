<?php defined('SYSPATH') or die('No direct script access.');

class Controller_User extends Controller_Base {

    public function action_index()
    {
        $this->trigger_error('user.default');
    }

    public function action_fans()
    {
        $query = Arr::get($_GET, 'q', false);
        $version = Arr::get($_GET, 'version', 0);
        $type = Arr::get($_GET, 's', 'user');

        $this->init_view('swirl', 'shared');
        $this->view->type = $type;
        $this->view->version = $version;
        $this->view->query = $query;

        if($user = $this->get_current_user())
        {
            $this->view->version = $user->pk();
        }
    }

    public function action_followers()
    {
        $query = Arr::get($_GET, 'q', false);
        $version = Arr::get($_GET, 'version', 0);
        $type = Arr::get($_GET, 's', 'user');

        $this->init_view('swirl', 'shared');
        $this->view->type = $type;
        $this->view->version = $version;
        $this->view->query = $query;

        if($user = $this->get_current_user())
        {
            $this->view->version = $user->pk();
        }
    }

    public function action_show()
    {
        $user = new Model_User($this->request->param('uid'));
        var_dump($user->as_array());
    }
}
