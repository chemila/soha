<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends Model {
    const CATEGORY_DEFAULT = 0;
    const CATEGORY_STAR    = 1;

    protected $_object = array();
    protected $_object_name;
    protected $_ignored_columns = array();
	protected $_table_columns = array(
        'nick', 'domain_name', 'pass', 'email', 'friends_count', 'followers_count',
        'statuses_count', 'portrait', 'gender', 'intro', 'country', 'province', 'city', 'regip', 'regdate', 
        'lastip', 'lastvisit', 'merged', 'verified', 'location', 'status', 'category',
    );
	protected $_primary_key  = 'uid';
	protected $_changed = array();
	protected $_saved   = FALSE;
    protected $_loaded = FALSE;
    protected $_preload_data = array();

    public function __construct($id = NULL, Array $data = NULL)
    {
		$this->_object_name   = strtolower(substr(get_class($this), 6));

        if ($id !== NULL)
		{
			$this->_object[$this->_primary_key] = $id;
            $this->_loaded = FALSE;
		}
		elseif ( ! empty($data))
		{
			// Load preloaded data from a database call cast
			$this->_preload_data = $data;
			$this->_load_values($data);
		}
    }

    public function load()
    {
		if ( ! $this->_loaded AND ! $this->empty_pk() AND ! isset($this->_changed[$this->_primary_key]))
		{
			// Only load if it hasn't been loaded, and a primary key is specified and hasn't been modified
            $result = Model_API::factory('user')->get_user_info(array('uid' => $this->pk()));

            if( ! $result)
            {
                throw new Model_User_Exception('User does not exist uid :uid', array(':uid' => $this->pk()));
            }
            
            $this->_load_values($result);
		}
    }

    public function loaded()
    {
        return $this->_loaded;
    }

    public function empty_pk()
    {
        return empty($this->_object[$this->_primary_key]);
    }

    /**
     * Create a user accoess api
     * Success: save user into local user table at the same time
     */
    public function create(Array $user_info)
    {
        $result = Model_API::factory('user')->create($user_info);

        return $this->uid = Arr::get($result, 'uid');
    }

    public function is_star()
    {
        $this->load();

        $category = Arr::get($this->_object, 'category', 0);
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

        return $result;
    }

    public function __get($column)
    {
		if (array_key_exists($column, $this->_object))
		{
			$this->load();

			return $this->_object[$column];
		}
		else
		{
			throw new Model_User_Exception('The :property property does not exist in the :class class',
				array(':property' => $column, ':class' => get_class($this)));
		}
    }

    public function __set($column, $value)
    {
		if ( ! isset($this->_object_name))
		{
			// Object not yet constructed, so we're loading data from a database call cast
			$this->_preload_data[$column] = $value;

			return;
		}

		if (array_key_exists($column, $this->_ignored_columns))
		{
			// No processing for ignored columns, just store it
			$this->_object[$column] = $value;
		}
		elseif (array_key_exists($column, $this->_object))
		{
			$this->_object[$column] = $value;

			if (isset($this->_table_columns[$column]))
			{
				// Data has changed
				$this->_changed[$column] = $column;

				// Object is no longer saved
				$this->_saved = FALSE;
			}
		}
		else
		{
			throw new Model_User_Exception('The :property property does not exist in the :class class',
				array(':property' => $column, ':class' => get_class($this)));
		}
    }

    public function __isset($key)
    {
        $this->load();

        return isset($this->_object[$key]);
    }

    public function __unset($column)
    {
        $this->load();
        
		unset($this->_object[$column], $this->_changed[$column]);
    }

	public function __toString()
	{
		return (string) $this->pk();
	}

    public function pk()
    {
        return $this->_object[$this->_primary_key];
    }

    public function values($values)
	{
		foreach ($values as $key => $value)
		{
			if (array_key_exists($key, $this->_object) OR array_key_exists($key, $this->_ignored_columns))
			{
				// Property of this model
				$this->__set($key, $value);
			}
		}

		return $this;
	}

    public function as_array()
	{
		$object = array();

		foreach ($this->_object as $key => $val)
		{
			// Call __get for any user processing
			$object[$key] = $this->__get($key);
		}

		return $object;
    }	

    public function save()
	{
		if (empty($this->_changed))
			return $this;

		$data = array();
		foreach ($this->_changed as $column)
		{
			// Compile changed data
			$data[$column] = $this->_object[$column];
		}

		if ( ! $this->empty_pk() AND ! isset($this->_changed[$this->_primary_key]))
		{
            $result = Model_API::factory('user')->update($this->pk(), $data);

            if($result)
            {
                // Object has been saved
                $this->_saved = TRUE;
            }
		}
		else
		{
            // Do insert a user record accoss api then save in local as star
            $result = Model_API::factory('user')->create($data);

			if ($result)
			{
				if ($this->empty_pk())
				{
					// Load the insert id as the primary key
					// $result is array(insert_id, total_rows)
                    $uid = Arr::get($result, 'uid');

                    if( ! $uid)
                    {
                        throw new Model_User_Exception('Create user error, no uid in response');
                    }

					$this->_object[$this->_primary_key] = $uid;
				}

				// Object is now loaded and saved
				$this->_loaded = $this->_saved = TRUE;
			}
		}

		if ($this->_saved === TRUE)
		{
			// All changes have been saved
			$this->_changed = array();
		}

		return $this;
	}

    protected function _load_values(array $values)
	{
		if (array_key_exists($this->_primary_key, $values))
		{
			// Set the loaded and saved object status based on the primary key
			$this->_loaded = $this->_saved = ($values[$this->_primary_key] !== NULL);
		}

		foreach ($values as $column => $value)
		{
            if ( ! isset($this->_changed[$column]))
            {
                $this->_object[$column] = $value;
            }
		}

		return $this;
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

    public function attention_list($category = 0, $page = 1, $limit = 6)
    {
        $params = array(
            'uid' => $this->pk(),
            'category' => (int)$category,
            'page' => (int)$page,
            'limit' => (int)$limit,
        );

        $result = Model_API::factory('user')->attention_list($params);
        
        return $result;
    }

    public function friends_list($page = 1, $limit = 6)
    {
        $params = array(
            'uid' => $this->pk(),
            'page' => (int)$page,
            'limit' => (int)$limit,
        );

        $result = Model_API::factory('user')->list_friend($params);
        
        return $result;
    }

    public function followers_of_friends($page = 1, $limit = 6)
    {
        $params = array(
            'uid' => $this->pk(),
            'page' => (int)$page,
            'limit' => (int)$limit,
        );

        $result = Model_API::factory('user')->attention_list($params);
        
        return $result;
    }

    public function inbox($page = 1, $limit = 10)
    {
        $attentions = $this->attention_list();
        $result = array();

        foreach($attentions as $record)
        {
            $user = new Model_User($record['uid']);
        }
    }

    public function outbox($page = 1, $limit = 10)
    {
        return array();
    }
}
