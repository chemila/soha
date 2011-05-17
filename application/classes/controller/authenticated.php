<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Authenticated extends Controller {
    public $user;
    public $cache;
    public $view;

    public function before()
    {
        $config = Core::config('auth.'.$this->request->controller);

        isset($config['skipped']) or $config['skipped'] = array();
        isset($config['required']) or $config['required'] = array();

        if( ! in_array($this->request->action, $config['skipped']) or 
              in_array($this->request->action, $config['required']))
        {
            if( ! $this->authenticate())
            {
                $this->request->action = 'forbidden';
                return false;
            }
        }

        $this->cache = cache::instance('memcache');

        return parent::before();
    }

    protected function authenticate()
    {
        // Check session or cookie whether user info exists
        $su = Cookie::get(Controller_Auth::COOKIE_NAME, false);

        if( ! $su)
            return false;

        preg_match('~^sid=(\w+);uid=(\d+)$~', $su, $match);

        if( ! $match)
            return false;

        $sid = $match[1];
        $uid = $match[2];

        $session = new Model_Session($uid);

        if( ! $session->sid or $sid != $session->sid)
            return false;

        $this->user = new Model_User($uid);

        return true;
    }

    public function action_forbidden()
    {
        // TODO: response oauth page with infomation about 
        // why oauth, and what's going on
        //$this->request->response = view::factory('oauth');
        $this->request->redirect('/auth');
    }

    public function after()
    {
        return parent::after();
    }
}
