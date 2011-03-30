<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Authenticated extends Controller {

    public function before()
    {
        $config = Core::config('auth.'.$this->request->controller);

        isset($config['skipped']) or $config['skipped'] = array();
        isset($config['required']) or $config['required'] = array();

        if( ! in_array($this->request->action, $config['skipped']) and 
              in_array($this->request->action, $config['required']))
        {
            if( ! $this->authenticate())
            {
                $this->request->action = 'forbidden';
                return false;
            }
        }

        return parent::before();
    }

    protected function authenticate()
    {
        return true;
    }

    protected function current_user()
    {
        return new Model_User(1);
    }

    public function action_forbidden()
    {
        $this->request->response = View::factory('error');
    }
}

