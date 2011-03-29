<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Help extends Controller {

    public function action_index()
    {
        $view = view_smarty::factory('smarty:help/index');

        $view->title = 'help tip';
        $view->set_global("tmp", '<span>hello world</span>');

        $this->request->response = $view->render();
    }
}

