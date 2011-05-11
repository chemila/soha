<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache {
    protected $_cache;
    protected $_value = array();
    protected $_data = array();
    protected $_key_prefix;
    protected $_key;

    public static function instance($type, $obj = NULL) 
    {
        $classname = "Model_Cache_".$type;
        return new $classname($obj);
    }

    public function __construct($obj = NULL)
    {
        $this->_cache = Cache::instance('memcache');

        if($obj instanceof Model_User)
        {
            $this->_user = $obj;
        }

        if($obj instanceof Model_Weibo)
        {
            $this->_weibo = $obj;
        }

        $this->_key_prefix = strtolower(str_replace('Model_Cache_', '', get_class($this)));
    }

    public function get($default = NULL)
    {
        return $this->_cache->get($this->_key, $default);
    }

    public function set($value)
    {
        return $this->_cache->set($this->_key, $value);
    }

    public function delete()
    {
        return $this->_cache->delete($this->_key);
    }

    public function append($value)
    {
        $original = $this->get();

        if( ! $original)
        {
            $new = array($value);
        }
        else
        {
            $new = array_merge($original, array($value));
        }

        return $this->set($new);
    }

    public function sort()
    {
        // Sort by timeline
        function cmp($a, $b)
        {
            return ($a > $b) ? -1 : 1;
        }


        usort($this->_value, "cmp");

        return $this;
    }

    public function count()
    {
        $this->_value = $this->get();

        if( ! $this->_value)
        {
            return 0;
        }

        return count($this->_value);
    }

    public function remove($value)
    {
        $this->_value = $this->get();

        foreach($this->_value as $k => $v)
        {
            if($v === $value)
            {
                unset($this->_value[$k]);
            }
        }

        return $this;
    }

    public function save_sync(Array $value)
    {
        $mq = Queue::instance();

        // Send to message queue
        $mq->create($this->_key_prefix);

        try
        {
            $mq->send($this->_key_prefix, serialize($value));
        }
        catch(Queue_Exception $e)
        {
            die($e->getMessage());
        }
    }

    public function limit($offset, $limit)
    {
        if( ! $this->_value)
        {
            $this->_value = $this->get();
        }
        
        $this->sort();

        return array_slice($this->_value, $offset, $limit);
    }

    public function add(Array $values)
    {
        $original = $this->get();
        $new = $original ? $original + $values : $values;

        return $this->set($new);
    }

    public function value()
    {
        return $this->_value;
    }
}
