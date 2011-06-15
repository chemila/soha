<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        $this->view = new View('help/index');
        $this->request->response = $this->view->render();
	}

    public function action_smarty()
    {
        $this->view = new View_Smarty;
        $this->view->var = 'test';
        $this->request->response = $this->view->render('smarty:help/test');
    }
}// End Welcome
