<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        $weibo = new Model_Weibo;

        var_dump($weibo->limit(10)->find_all()->as_array());
	}

    public function action_smarty()
    {
        $this->view = new View_Smarty('smarty:help/index');
        $this->request->response = $this->view->render();
    }
}// End Welcome
