<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        $this->view = new View('help/index');
        $this->request->response = $this->view->render();
	}
}// End Welcome
