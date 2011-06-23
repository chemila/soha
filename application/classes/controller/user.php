<?php defined('SYSPATH') or die('No direct script access.');

class Controller_User extends Controller_Base {

    public function action_index()
    {

    }

    public function action_relationship()
    {
        $uid = Arr::get($_GET, 'uid', 1005136);
        $json = array();
        
        $user = new Model_User($uid);
        $self = array('uid' => '1', 'nick' => 'fuqiang', 'intro' => 'root');
        $fans = $user->get_fans();
        $followers = $user->get_followers();

        $json = array_push($fans, $self);
        $json = $fans + $followers;

        $this->init_view();
        $this->view->json = json_encode($json);
    }
}
