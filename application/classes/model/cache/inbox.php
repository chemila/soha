<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache_Inbox extends Model_Cache {

    public function get($default = NULL)
    {
        $value = parent::get($default);
        return $this->_value = empty($value) ? array() : array_unique($value);
    }

    public function receive($wid)
    {
        $this->_data[] = $wid;

        if($this->_user->is_online())
        {
            try
            {
                $this->append($wid);
            }
            catch(Cache_Exception $e) 
            {
                throw $e; 
            }
        }

        $data = array(
            'uid' => $this->_user->pk(),
            'wid' => $wid,
            'created_at' => time(),
        );

        $this->save_sync($data);

        return $this;
    }
}

