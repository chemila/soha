<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Welcome extends Controller {

	public function action_index()
	{
		$this->request->response = 'hey u!';
	}

    public function action_test() {
        $res = Core::find_file('class', 'CE');
        //var_dump(Core::config('database')); 
        //var_dump(Validate::email('test@@fdsf.com'));
        throw new CE('test');
        $this->request->response = 'tset';
    }
} // End Welcome
