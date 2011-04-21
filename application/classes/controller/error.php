<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Error extends Controller {

    public $info = array();

    public $title = '';

    public $template_dir = 'error';

    public function before()
	{
		$this->template = View::factory($this->template_dir.DIRECTORY_SEPARATOR.$this->request->action);
		return parent::before();
	}

    public function action_404()
    {
        $this->title = '404';
    }

    public function action_oauth()
    {
        $this->title = 'oauth';
    }

    public function action_user()
    {
    }

    public function after()
    {
	    $this->request->response = $this->template;
    }
}
