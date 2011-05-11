<?php defined('SYSPATH') or die('No direct script access.');

abstract class Model_QORM extends ORM {

    protected $_queue_key;
    protected $_mq;
    protected $_mc;

    public function init()
    {
        $this->_queue_key = $this->_table_name;
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
        }
        catch(Queue_Exception $e)
        {
            // Save as usual
            $this->save();
            return $this->saved();
        }

        return true;
    }

    public function pull()
    {
        $this->init();
        $data = $this->_mq->receive($this->_queue_key);

        if( ! $data[0]['body'])
        {
            return false;
        }

        $to_save = unserialize($data[0]['body']);

        if(is_array($to_save))
        {
            $classname = 'Model_'.$this->_table_name;

            $obj = new $classname;

            $obj->values($to_save);
            $obj->save();
        }

        return true;
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
}
