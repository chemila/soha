<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        $this->view = new View_Smarty('smarty:help/index');
        $this->request->response = $this->view->render();
	}

    public function action_debug()
    {
        die('rewrite enabled');
    }
}// End Welcome
