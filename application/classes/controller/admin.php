<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Authenticated {

    public function before()
    {
        parent::before();
    }

    protected function authenticate()
    {
        $valid = parent::authenticate();

        if( ! $valid)
            return false;

        return 1000000 == $this->user->uid;
    }
}
