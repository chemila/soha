<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache_Friend extends Model_Cache {

    public function add_user($uid)
    {
        if($this->_user->is_online())
        {
            $this->_data[] = $uid;

            try
            {
                $this->append($uid);
            }
            catch(Cache_Exception $e){}
        }
    }
}

