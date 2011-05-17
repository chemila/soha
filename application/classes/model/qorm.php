<?php defined('SYSPATH') or die('No direct script access.');

abstract class Model_QORM extends ORM {

    protected $_queue_key;
    protected $_mq;
    protected $_mc;

    protected $_ignored_columns = array('_queue_key', '_queue_trash_key', 'user');

    public function init()
    {
        $this->_queue_key = $this->_table_name;
        $this->_queue_trash_key = sprintf('%s:trash', $this->_table_name);
        $this->_mq = Queue::instance();
    }

    public function push()
    {
        $this->init();

        try
        {
            // Send to message queue
            $this->_mq->create($this->_queue_key);
            $this->_mq->send($this->_queue_key, serialize($this->as_array()));

            return true;
        }
        catch(Queue_Exception $e)
        {
            // Save as usual
            $this->save();
            return $this->saved();
        }
    }

    public function pull($limit = 10)
    {
        $this->init();
        $data = $this->_mq->receive($this->_queue_key, max(0, $limit));

        if(empty($data))
            return false;

        $classname = 'Model_'.$this->_table_name;

        foreach($data as $array)
        {
            if(empty($array['body']))
                continue;

            $to_save = unserialize($array['body']);
            if(is_array($to_save))
            {
                $obj = new $classname;

                $obj->values($to_save);
                $obj->save();
            }
        }
        
        return true;
    }

    public function move_to_trash($data)
    {
        $this->init();

        try
        {
            // Send to message queue
            $this->_mq->create($this->_queue_trash_key);
            $this->_mq->send($this->_queue_trash_key, serialize($data));
        }
        catch(Queue_Exception $e)
        {
            if( ! is_array($data))
            {
                $data = array($this->_primary_key => $data);
            }

            list($key, $value) = each($data);
            return DB::delete($this->_table_name)->where($key, '=', $value)->execute($this->_db);
        }
        
        return true;
    }

    public function clear_trash()
    {
        $this->init();
        $data = $this->_mq->receive($this->_queue_trash_key);

        if( ! $data[0]['body'])
        {
            return false;
        }

        $to_remove = unserialize($data[0]['body']);

        if( ! is_array($to_remove))
        {
            $to_remove = array($this->_primary_key => $to_remove);
        }

        list($key, $value) = each($to_remove);
        return DB::delete($this->_table_name)->where($key, '=', $value)->execute($this->_db);
    }
    
    public function save_sync()
    {
        $this->_mc = Cache::instance();

        // Send to message queue
        $this->_mq->create($this->_queue_key);

        $version = self::get_current_version();
        $this->cv = self::CACHE_VERSION_PREFIX.$version;

        $mq->send(self::CACHE_KEY, serialize($this->as_array()));

        // Save into cache
        if($cache->set(self::CACHE_KEY.':'.self::CACHE_VERSION_PREFIX.$version, $this->as_array()))
        {
            return self::CACHE_VERSION_PREFIX.$version;
        }

        return false;
    }

    public static function get_current_version($with_prefix = FALSE)
    {
        $cache = Cache::instance();

        $version = self::get_last_version();
        // TODO: use memcached increment instead
        $version ++;
        $cache->set(self::CACHE_KEY.':version', $version);

        return $with_prefix ? self::CACHE_VERSION_PREFIX.$version : $version;
    }

    public static function get_last_version($with_prefix = FALSE)
    {
        $cache = Cache::instance();

        $version = $cache->get(self::CACHE_KEY.':version', time());
        return $with_prefix ? self::CACHE_VERSION_PREFIX.$version : $version;
    }

    public static function cache_instance($version)
    {
        $cache = Cache::instance();

        $version = ltrim($version, self::CACHE_VERSION_PREFIX);
        $object = $cache->get(self::CACHE_KEY.':'.self::CACHE_VERSION_PREFIX.$version);

        if( ! $object)
        {
            throw new Model_Weibo_Exception('weibo::version does not exist in cache', 
                    array(':version' => $version));
        }

        $instance = new self;
        $instance->_load_values($object);

        return $instance;
    }

    public function extend_collection(Database_MySQL_Result $collection)
    {
        $array = array();

        foreach($collection as $obj)
        {
            if( ! $obj instanceof self)
            {
                throw new CE('Invalid type :obj is not instanceof :class', array(
                    ':obj' => get_class($obj),
                    ':class' => get_class($this),
                ));
            }
            
            $array[] = $obj->extend()->as_array();
        }

        return $array;
    }

    public function extend()
    {
        throw new CE('Not implemented method :method', array(':method' => __FUNCTION__));
    }
}
