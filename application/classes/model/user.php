<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends Model {

    public function __construct($uid)
    {
        $this->uid = $uid;
        $this->data = array();
    }

    public function get_info() {
        // get user info through API like: 
        // Remote::get($api_url, 'json');
        $this->data = array(
            'uid' => $this->uid,
            'name' => 'hello',
            'nick' => 'hello',
        );

        return $this->data;
    }

    public function __tostring()
    {
        if( ! $this->data)
        {
            $this->get_info();
        }

        return $this->uid;
    }
}
