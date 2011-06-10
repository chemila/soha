<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache {
    protected $_cache;
    protected $_value = array();
    protected $_data = array();
    protected $_key_prefix;
    protected $_key;
	protected $_user;
	protected static $_types = array('inbox', 'outbox', 'following', 'friend', 'unread');

    public static function factory($type, Model_User $user) 
    {
		if( ! in_array($type, self::$_types))
		{
			throw new Model_Cache_Exception('Invalid cache type: :type', array(':type' => $type));
		}

        $classname = "Model_Cache_".$type;
        return new $classname($user);
    }

    public function __construct(Model_User $user)
    {
        $this->_cache = Cache::instance('memcache');
		$this->_user = $user;
        $this->_key_prefix = strtolower(str_replace('Model_Cache_', '', get_class($this)));
        $this->_key = $this->_key_prefix.':'.$this->_user->pk();
    }

    public function get($default = NULL)
    {
        return $this->_value = $this->_cache->get($this->_key, $default);
    }

    public function set(Array $value)
    {
		$this->_value = $value;
        return $this->_cache->set($this->_key, $this->_value);
    }

    public function init(Array $value)
    {
        if( ! $value)
            return;

        if( ! $this->get())
        {
            $this->set($value);
        }
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

    public function remove($value)
    {
        $original = $this->get();

        if( ! $original or ! is_array($original))
        {
            return $this;
        }
        
        $new = $original;
        $key = array_search($value, $new);

        if($key)
        {
            unset($new[$key]);
        }

        $this->set($new);

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
            //die($e->getMessage());
        }
    }

    public function fetch($offset = 0, $limit = 30)
    {
        if( ! $this->_value)
        {
            $this->_value = $this->get();
        }
        
        if(empty($this->_value))
            return;

        rsort($this->_value);
        
        return array_slice($this->_value, $offset, $limit);
    }

    public function add(Array $values)
    {
        $original = $this->get();
        $new = $original ? array_merge($original, $values) : $values;

        return $this->set($new);
    }

    public function value()
    {
        return $this->_value;
    }

	public static function cleanup(Model_User $user)
	{
		foreach(self::$_types as $type)
		{
			$classname = "Model_Cache_".$type;
			$cache = new $classname($user);
			
			$cache->delete();
		}
	}
}
