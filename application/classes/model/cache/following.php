<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache_Following extends Model_Cache {

    public function add_user($uid)
    {
        if($this->_user->is_online())
        {
            try
            {
                $this->append($uid);
            }
            catch(Cache_Exception $e){}
        }
    }

    public function remove_user($uid)
    {
        if($this->_user->is_online())
        {
            try
            {
                $this->remove($uid);
            }
            catch(Cache_Exception $e){}
        }
    }
}
