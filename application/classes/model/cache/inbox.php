<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache_Inbox extends Model_Cache {

    public function __construct($user)
    {
        parent::__construct($user);
        $this->_key = $this->_key_prefix.':'.$this->_user->pk();
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

    public function receive(Model_Weibo $weibo)
    {
        $this->_data[] = $weibo;

        if($this->_user->is_online())
        {
            try
            {
                $this->append($weibo->pk());
            }
            catch(Cache_Exception $e) 
            {
                throw $e; 
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

    public function pull($limit = 10, $offset = 0)
    {
        $friends = $this->_user->get_friends();
        $result = array();
        
        foreach($friends as $uid)
        {
            $user = new Model_User($uid);
            
            $outbox = new Model_Cache_Outbox($user);
            $result += $outbox->fetch($limit, $offset);
        }

        return $result;
    }
}

