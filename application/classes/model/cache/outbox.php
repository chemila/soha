<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache_Outbox extends Model_Cache {

    public function __construct($user)
    {
        parent::__construct($user);
        $this->_key = $this->_key_prefix.':'.$this->_user->pk();
    }

    public function receive(Model_Weibo $weibo)
    {
        if($this->_user->is_online())
        {
            $this->_data[] = $weibo;

            try
            {
                $this->append($weibo->pk());
            }
            catch(Cache_Exception $e)
            {
                die($e->getMessage());
            }
        }

        $data = array(
            'uid' => $this->_user->pk(),
            'wid' => $weibo->pk(),
            'created_at' => time(),
        );
        $this->save_sync($data);

        return $this;
    }

    // TODO: push to @users at the same time
    public function push(Array $ats = NULL)
    {
        $users = $this->_user->get_fans_ids($this->_user->pk());

        if( ! $users)
        {
            $users = array();
        }

        // Push to self as well
        $users[] = $this->_user->pk();

        if( ! empty($ats))
        {
            $users = array_merge($users, $ats);
        }

        $users = array_unique($users);

        foreach($users as $uid)
        {
            $user = new Model_User($uid);
            $inbox = new Model_Cache_Inbox($user);

            foreach($this->_data as $weibo)
            {
                $inbox->receive($weibo);
            }
        }

        return true;
    }

    public function pull(Array $ats = NULL)
    {
        $users = $this->_user->get_fans_ids($this->_user->pk());

        if( ! $users)
        {
            $users = array();
        }

        // Push to self as well
        $users[] = $this->_user->pk();

        if( ! empty($ats))
        {
            $users = array_merge($users, $ats);
        }

        $users = array_unique($users);

        foreach($users as $uid)
        {
            $user = new Model_User($uid);
            $inbox = new Model_Cache_Inbox($user);

            foreach($this->_data as $weibo)
            {
                $inbox->remove($weibo->pk());
            }
        }

        return true;
    }

    public function fetch($limit = 40, $offset = 0)
    {
        $value = $this->get();

        if( ! $value or ! is_array($value))
        {
            return array();
        }

        $this->_value = $value;

        return $this->limit($offset, $limit);
    }
}
