<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Block extends Controller_Authenticated {

    public function action_index()
    {
        $model_block = new Model_Block;
        $blocks = $model_block->all_by_user($this->current_user()->uid);
        $view = new View_Smarty('smarty:block/index');

        $view->blocks = $blocks;

        $this->request->response = $view->render();
    }

    public function action_add()
    {
    }

    public function action_rm()
    {
    }

    public function action_get()
    {
    }
}

