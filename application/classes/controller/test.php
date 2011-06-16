<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        $this->request->redirect('error/404');
	}

    public function action_debug()
    {
        die('rewrite enabled');
    }
}// End Welcome
