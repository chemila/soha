<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Authenticated extends Controller_Base {
    public $user;

    public function before()
    {
        $header = array(
            'Pragma' => 'no-cache',
			'Cache-Control' => 'private, no-cache, must-revalidate, no-store',
            'Expires' => 0,
		);

        $this->request->headers = $header + $this->request->headers;

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

        if($this->user)
        {
            $this->init_cache($this->user);
        }

        return parent::before();
    }

    protected function authenticate()
    {
        $user = $this->get_current_user();
        if( ! $user)
            return false;

        $this->user->online = 1;
        return true;
    }

    public function action_forbidden()
    {
        if(Request::$is_ajax)
        {
            $this->response_json('CC2510');
        }

        $this->request->redirect('/auth');
    }

    public function after()
    {
        return parent::after();
    }
}
