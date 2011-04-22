<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Queue extends Controller {

    public function before()
    {
        $this->queue = Queue::instance();

        return parent::before();
    }

    public function action_run()
    {
    
    }
}
