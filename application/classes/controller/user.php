<?php defined('SYSPATH') or die('No direct script access.');

class Controller_User extends Controller_Base {

    public function action_index()
    {

    }

    public function action_relation()
    {
        $uid = Arr::get($_GET, 'uid', 1005136);

        $user = new Model_User($uid);
        $fans = DB::
    }
}
