<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends Model {

    public function __construct($uid)
    {
        $this->uid = $uid;
    }

    public function get_info() {
        // get user info through API like: 
        // Remote::get($api_url, 'json');
        return array(
            'uid' => $this->uid,
            'name' => 'hello',
            'nick' => 'hello',
        );
    }
}
