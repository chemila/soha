<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Authenticated {

    protected function authenticate()
    {
        $res = parent::authenticate();

        if( ! $res)
            return FALSE;

        return in_array($this->user->pk(), array(1003321, 1003324, 1003322));
    }

    public function action_forbidden()
    {
        $this->request->redirect('/');
    }
}
