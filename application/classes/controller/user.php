<?php defined('SYSPATH') or die('No direct script access.');

class Controller_User extends Controller_Authenticated {

    public function action_index()
    {

    }

    public function action_relationship()
    {
        $fans = $this->user->fans->find_all();
        $followers = $this->user->followers->find_all();
        $json = array();

        foreach($fans as $value)
        {
            $user = new Model_User($value->fuid);
            $json[] = array(
                'uid' => $user->pk(),
                'nick' => $user->nick,
                'intro' => $user->intro,
                'fuid' => $this->user->nick,
            );
        }

        foreach($followers as $value)
        {
            $user = new Model_User($value->uid);
            $json[] = array(
                'uid' => $this->user->pk(),
                'nick' => $this->user->nick,
                'intro' => $this->user->intro,
                'fuid' => $user->nick,
            );
        }

        $this->init_view();
        $this->view->json = json_encode($json);
    }
}
