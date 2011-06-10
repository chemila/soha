<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache_Unread extends Model_Cache {

    public function push($users = NULL, $category)
    {
        if( ! in_array($category, Model_Unread::$categories))
        {
            throw new Model_Cache_Exception('Invalid unread cache category: :category', 
                    array(':category' => $category));
        }

        if($users)
        {
            if( ! is_array($users))
            {
                $users = array($users);
            }
            $users = array_unique($users);
            foreach($users as $uid)
            {
                if($uid === $this->_user->pk())
                    continue;

                $user = new Model_User($uid);
                $unread = new self($user);
                $unread->receive($category);
            }
        }
        
        return $this;
    }

    public function receive($category)
    {
        $this->increase($category)->do_save();
        
        return $this;
    }

    public function do_save()
    {
        $data = array(
            'uid' => $this->_user->pk(),
            'status' => $this->_value,
            'updated_at' => time(),
        );

        $this->save_sync($data);

        return $this;
    }

    public function increase($category, $inc = 1)
    {
        $value = $this->get(Model_Unread::get_default());
        $cnt = Arr::get($value, $category, 0);
        $cnt += $inc;

        $value[$category] = $cnt;
        $this->set($value);

        return $this;
    }

    public function clear($category)
    {
        $value = $this->get(Model_Unread::get_default());
        $value[$category] = 0;
        $this->set($value);
        $this->do_save(); 

        return $this;
    }

    public function __call($method_name, $params)
    {
        $prefix = 'push_';

        if(false === strpos($method_name, $prefix))
        {
            throw new Model_Cache_Exception('Invalid method: :method', array(':method' => $method_name));
        }

        $category = substr($method_name, strlen($prefix));
        return $this->push($params[0], $category);
    }
}
