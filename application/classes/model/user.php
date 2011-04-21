<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends Model {
    const CATEGORY_DEFAULT = 0;
    const CATEGORY_STAR    = 1;

    protected $_data = array();

    public function __construct($uid = NULL, Array $data = NULL)
    {
        $this->uid = $uid;

        if($data)
        {
            $this->_data = $data;
        }
    }

    public function init($refresh = false) {
        if( ! $this->uid)
            return false;

        if($this->_data and ! $refresh)
            return $this->_data;

        $this->_data = Model_API::factory('user')->get_user_info(array('uid' => $this->uid));

        if($this->is_star())
        {
            $star = new Model_User_Star($this->uid);
            return $star->init();
        }
        else
        {
            return $this->_data;
        }
    }

    public function get_access_token()
    {
        return DB::select('*')
            ->from('user_token')
            ->where('uid', '=', $this->uid)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();
    }

    public function save_token($token, $secret)
    {
        $data = array(
            'uid' => $this->uid,
            'token' => $token,
            'secret' => $secret,
            'created_at' => time(),
            'updated_at' => time(),
        );

        return DB::insert('user_token')
            ->columns(array_keys($data))
            ->values(array_values($data))
            ->execute($this->_db);
    }

    public function has_access_token()
    {
        $record =  DB::select('id')
            ->from('user_token')
            ->where('uid', '=', $this->uid)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();

        return ! empty($record);
    }

    /**
     * Create a user accoess api
     * Success: save user into local user table at the same time
     */
    public function create(Array $user_info, $star = FALSE)
    {
        $result = Model_API::factory('user')->create($user_info);

        $this->uid = Arr::get($result, 'uid');
        $this->_data = $result;

        if( ! $this->uid)
        {
            throw new Model_User_Exception('Create user error, no uid in response');
        }

        // Create user successfully, save star info locally
        if($star or $this->is_star())
        {
            $star = new Model_User_Star($this->uid);
            return $star->insert_or_update($user_info);
        }

        return true;
    }

    public function get_source_code($source)
    {
        $config = Core::config('oauth.'.$source.'.source');

        if(NULL === $config)
        {
            throw new Model_User_Exception('Unknown user source: :source', array(':source' => $source));
        }

        return $config;
    }

    public function is_star()
    {
        $category = Arr::get($this->_data, 'category', 0);
        return $category == self::CATEGORY_STAR;
    }

    public function check_exist($suid, $source)
    {
        $result = Model_API::factory('user')->check_login(array(
            'suid' => $suid,
            'source' => $source,
        ));

        if( ! $result)
            return false;

        return $this->uid = $result;
    }

    public function __get($key)
    {
        if('uid' == $key)
            return $this->uid;

        if(empty($this->_data))
        {
            $this->init();
        }

        return Arr::get($this->_data, $key);
    }

    public function __set($key, $value)
    {
        if('uid' == $key)
        {
            $this->uid = (int)$value;
        }

        if(empty($this->_data))
        {
            $this->init();
        }

        $this->_data[$key] = $value;
        return $this;
    }

    public function __isset($key)
    {
        if('uid' == $key)
        {
            return $this->uid;
        }

        if(empty($this->_data))
        {
            $this->init();
        }

        return Arr::get($this->_data, $key, false);
    }

    public function __unset($key)
    {
        if('uid' == $key)
        {
            throw new Model_User_Exception('U cant unset user uid');
        }

        if(empty($this->_data))
        {
            $this->init();
        }
        
        if(isset($this->_data[$key]))
        {
            unset($this->_data[$key]);
        }

        return $this;
    }

    public function __tostring()
    {
        if(empty($this->_data))
        {
            $this->init();
        }

        return Core::debug($this->_data); 
    }

    public function as_array()
    {
        if(empty($this->_data))
        {
            $this->init();
        }

        return array('uid' => $this->uid) + $this->_data;
    }
}
