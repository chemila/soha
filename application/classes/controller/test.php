<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        $weibo = new Model_Weibo;

        var_dump($weibo->find_all()->as_array());
	}
}// End Welcome
