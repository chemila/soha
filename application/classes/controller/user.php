<?php defined('SYSPATH') or die('No direct script access.');

class Controller_User extends Controller_Base {

    public function action_index()
    {
        $query = Arr::get($_GET, 'q', false);

        $this->init_view('swirl', 'shared');
        $this->view->query = $query;
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

    public function action_show()
    {
        $user = new Model_User($this->request->param('uid'));
        $this->trigger_error('todo'); 
    }
}
