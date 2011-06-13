<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {
	public function action_index()
	{
        $weibo = new Model_Weibo;

        $weibo->content = 'test';
        $weibo->uid = 1;

        $weibo->save();

        var_dump($weibo->saved());
        die('nice');
	}
}// End Welcome
