<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache_Outbox extends Model_Cache {

    public function get($default = NULL)
    {
        $value = parent::get($default);
        return $this->_value = empty($value) ? array() : array_unique($value);
    }

    public function receive($wid)
    {
        if($this->_user->is_online())
        {
            $this->_data[] = $wid;

            try
            {
                $this->append($wid);
            }
            catch(Cache_Exception $e){}
        }

        $data = array(
            'uid' => $this->_user->pk(),
            'wid' => $wid,
            'created_at' => time(),
        );
        $this->save_sync($data);

        return $this;
    }

    // TODO: push to @users at the same time
    public function push(Array $users = NULL, $with_self = TRUE)
    {
        // Push to self as well
        if($with_self)
        {
            $users[] = $this->_user->pk();
        }
    
        $users = array_unique($users);

        foreach($users as $uid)
        {
            $this->push_once($uid);
        }

        return $this;
    }

    public function push_once($uid)
    {
        $user = new Model_User($uid);
        $inbox = new Model_Cache_Inbox($user);

        foreach($this->_data as $wid)
        {
            $inbox->receive($wid);
        }

        return $this;
    }

    public function pull(Array $users = NULL, $with_self = TRUE)
    {
        if($with_self)
        {
            $users[] = $this->_user->pk();
        }

        $users = array_unique($users);

        foreach($users as $uid)
        {
            $user = new Model_User($uid);
            $inbox = new Model_Cache_Inbox($user);

            foreach($this->_data as $wid)
            {
                $inbox->remove($wid);
            }
        }

        return true;
    }
}
