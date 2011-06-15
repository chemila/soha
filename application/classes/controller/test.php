<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        $this->view = new View('help/index');
        $this->request->response = $this->view->render();
	}

    public function action_smarty()
    {
        $class = 'View_Smarty';
		$file = str_replace('_', '/', strtolower($class));
		$path = Core::find_file('classes', $file);
        var_dump($path);
        var_dump(file_exists($path));

        $this->view = new View_Smarty;
        $this->view->var = 'test';
        $this->request->response = $this->view->render('smarty:help/test');
    }

    public function action_modules()
    {
        Cron::set('queue_inbox', array('* * * * *', array($this, 'test')));
        Cron::run();

        $queue = Queue::instance('native');
        $queue->create('test');
        $queue->send('t','hello world');
        var_dump($queue->receive('t'));
    }

    public function test()
    {
        echo 'test';
    }
}// End Welcome
