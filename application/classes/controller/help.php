<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Help extends Controller_Base {

    public function action_index()
    {
        $this->init_view();
    }

    public function action_intl()
    {
        $this->trigger_error('help.default');
    }
}

