<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Authenticated extends Controller {

    public function before()
    {
        Cookie::delete('uid');
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
        // Check session or cookie whether user info exists
        $uid = Cookie::get('uid', false);
        $name = Cookie::get('name', false);

        if($uid and $name)
        {
            $this->user = $this->current_user($uid, $name);
            return true;
        }

        return false;
    }

    protected function current_user($uid, $name)
    {
        return new Model_User($uid, $name);
    }

    public function action_forbidden()
    {
        // TODO: response oauth page with infomation about 
        // why oauth, and what's going on
        $this->request->response = view::factory('oauth');
    }
}
