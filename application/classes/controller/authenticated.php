<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Authenticated extends Controller {
    public $user;
    public $cache;
    public $view;
    public $mq;

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
        $this->mq = queue::instance();

        return parent::before();
    }

    protected function authenticate()
    {
        // Check session or cookie whether user info exists
        $session = Session::instance();

        if($uid = $session->get('uid'))
        {
            $session_model = new Model_Session;
            $data = $session_model->read($session->id());

            if( ! $data)
                return false;

            if($uid !== $data['uid'])
                return false;

            $this->user = new Model_User($uid);

            return true;
        }

        return false;
    }

    public function action_forbidden()
    {
        // TODO: response oauth page with infomation about 
        // why oauth, and what's going on
        //$this->request->response = view::factory('oauth');
        $this->request->redirect('/auth');
    }
}
