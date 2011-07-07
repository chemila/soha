<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Authenticated extends Controller_Base {
    public $user;

    public function before()
    {
        $config = Core::config('auth.'.$this->request->controller);

        isset($config['skipped']) or $config['skipped'] = array();
        isset($config['required']) or $config['required'] = array();

        if( ! in_array($this->request->action, $config['skipped']) or 
              in_array($this->request->action, $config['required']))
        {
            if( ! $user = $this->authenticate())
            {
                $this->request->action = 'forbidden';
                return false;
            }

            $this->user = $user;
        }

        return parent::before();
    }

    protected function authenticate()
    {
        return $this->get_current_user();
    }

    public function action_forbidden()
    {
        if(Request::$is_ajax)
        {
            $this->response_json();
        }

        $this->request->redirect('auth');
    }
}
