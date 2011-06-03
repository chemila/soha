<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends Model {
    const CATEGORY_DEFAULT = 0;
    const CATEGORY_STAR    = 1;
    const CATEGORY_ALL     = NULL;

    protected $_object = array();
    protected $_object_name;
    protected $_ignored_columns = array();
	protected $_columns = array(
        'nick', 'domain_name', 'pass', 'email', 'friends_count', 'followers_count',
        'statuses_count', 'portrait', 'gender', 'intro', 'country', 'province', 'city', 'regip', 'regdate', 
        'lastip', 'lastvisit', 'merged', 'verified', 'location', 'status', 'category', 'online',
    );
    protected $_table_columns = array();
	protected $_primary_key  = 'uid';
	protected $_changed = array();
	protected $_saved   = FALSE;
    protected $_loaded = FALSE;
    protected $_preload_data = array();
	// Members that have access methods
	protected static $_properties = array(
		'object_name', 'object_plural', 'loaded', 'saved', // Object
		'primary_key', 'primary_val', 'table_name', 'table_columns', // Table
		'has_one', 'belongs_to', 'has_many', 'has_many_through', 'load_with', // Relationships
		'validate', 'rules', 'callbacks', 'filters', 'labels' // Validation
	);

    public function __construct($id = NULL, Array $data = NULL)
    {
		$this->_object_name   = strtolower(substr(get_class($this), 6));

        $this->_initialize();
        $this->clear();

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

    protected function _initialize()
    {
		foreach($this->_columns as $column)
        {
            $this->_table_columns[$column] = array();
        }
    }

    /**
	 * Unloads the current object and clears the status.
	 *
	 * @chainable
	 * @return  ORM
	 */
	public function clear()
	{
		// Create an array with all the columns set to NULL
		$values = array_combine(array_keys($this->_table_columns), array_fill(0, count($this->_table_columns), NULL));

		// Replace the object and reset the object status
		$this->_object = $this->_changed = array();

		// Replace the current object with an empty one
		$this->_load_values($values);

		return $this;
	}

    public function load()
    {
		if ( ! $this->_loaded AND ! $this->empty_pk() AND ! isset($this->_changed[$this->_primary_key]))
		{
			// Only load if it hasn't been loaded, and a primary key is specified and hasn't been modified
            try
            {
                $result = Model_API::factory('user')->get_user_info(array('uid' => $this->pk()));
                $this->_load_values($result);
            }
            catch(Model_API_Exception $e)
            {
                $this->_loaded = FALSE;
                $this->clear();

                return FALSE;
            }
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

        $uid = Arr::get($result, 'uid');

        if($uid)
            return $this->pk($uid);
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

        return $this->pk($result);
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

        if('_table_column' == $column)
        {
            $this->_table_column = $value;
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

    /**
	 * Handles pass-through to database methods. Calls to query methods
	 * (query, get, insert, update) are not allowed. Query builder methods
	 * are chainable.
	 *
	 * @param   string  method name
	 * @param   array   method arguments
	 * @return  mixed
	 */
	public function __call($method, array $args)
	{
		if (in_array($method, self::$_properties))
		{
			if ($method === 'loaded')
			{
				if ( ! isset($this->_object_name))
				{
					// Calling loaded method prior to the object being fully initialized
					return FALSE;
				}

				$this->load();
			}

			// Return the property
			return $this->{'_'.$method};
		}
		else
		{
			throw new Model_User_Exception('Invalid method :method called in :class',
				array(':method' => $method, ':class' => get_class($this)));
		}
	}

    public function pk($uid = NULL)
    {
        if($uid)
        {
            $this->_object[$this->_primary_key] = $uid;
        }

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
        $this->load();
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

    public function save_token(OAuth_Token_Access $access_token)
    {
        $token = new Model_User_Token($this->pk());
        $token->reload();

        if( ! $token->loaded())
        {
            $token->uid = $this->pk();
        }

        $token->token = $access_token->token;
        $token->secret = $access_token->secret;
        $token->created_at = time();

        $token->save();
        return $token->saved();
    }

    public function save_session($sid = NULL, Array $data = NULL)
    {
        $session = new Model_Session($this->pk());
        $session->reload();

        if( ! $session->loaded())
        {
            $session->uid = $this->pk();
        }

        $session->sid = isset($sid) ? $sid : md5($this->pk().time().Text::random());
        $session->updated_at = time();
        if($data)
        {
            $session->data = serialize($data);
        }

        $session->save();

        if($session->saved())
            return $session->sid;

        return false;
    }

    public function get_access_token()
    {
        $token = new Model_User_Token($this->pk());
        return $token->as_array();
    }

    public function list_following($category = self::CATEGORY_ALL, $page = 1, $limit = 20)
    {
        $params = array(
            'uid' => $this->pk(),
            'category' => $category,
            'page' => $page,
            'limit' => $limit,
        );

        return Model_API::factory('user')->attention_list($params);
    }

    public function count_following($category = self::CATEGORY_ALL)
    {
        $params = array(
            'uid' => $this->pk(),
            'category' => $category,
        );
		$response = Model_API::factory("user")->attention_count($params);

		return $response[0];
    }

    public function add_followding($uid)
    {
        $params = array(
            'uid' => $this->pk(),
            'fuids' => $uid,
        );

		$response = Model_API::factory("user")->add_attention($params);

		return $response;
    }

    public function rm_following($uid)
    {
        $params = array(
            'uid' => $this->pk(),
            'fuids' => $uid,       
        );
        $response = Model_API::factory("user")->delete_attention($params);

		return $response;
    }

    public function list_fans($page = 1, $limit = 20)
    {
		return Model_API::factory("user")->fans_list(array(
                'uid' => $this->pk(),
                'page' => $page,
                'limit' => $limit,
        ));
    }

    public function count_fans()
    {
		$response = Model_API::factory("user")->get_fans_count(array('uid' => $this->pk()));
		return $response[0];
    }

    public function rm_fans($uid)
    {
        $params = array(
            'uid' => $this->pk(),
        	'fuids' => $uid,
        );

		return Model_API::factory("user")->fans_del($params);
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

        $result = Model_API::factory('user')->followers_of_followers($params);
        
        return $result;
    }

    // TODO: implement it
    public function is_online()
    {
        return true;
    }

    public function get_fans_ids()
    {
        try
        {
            $response = Model_API::factory('user')->get_fans_all_uid(array('uid' => $this->pk()));
            return Arr::flatten($response);
        }
        catch(Model_API_Exception $e){}
    }

    public function get_following_ids()
    {
        try
        {
            return Model_API::factory('user')->get_attention_all_uid(array('uid' => $this->pk()));
        }
        catch(Model_API_Exception $e){}
    }

    public function inbox($page = 1, $limit = 30)
    {
        $offset = ($page - 1) * $limit;

        $inbox = new Model_Inbox;
        $inbox_cache = new model_cache_inbox($this);

        $cached = $inbox_cache->fetch($offset, $limit);
        if($cached and count($cached) >= $limit)
            return $cached;

        $records = $inbox->where('uid', '=', $this->pk())
            ->limit($limit)
            ->offset($offset)
            ->order_by('wid', 'desc')
            ->find_all()
            ->as_array('wid');

        if( ! $records)
            return $cached;

        $saved = array_keys($records); 
        $inbox_cache->add($saved);

        return $inbox_cache->fetch($offset, $limit);
    }

    public function inbox_since($since_id, $limit = 10)
    {
        $inbox = new Model_Inbox;
        $inbox_cache = new model_cache_inbox($this);

        $cached = $inbox_cache->fetch(0, $limit);
        if( ! $cached)
            return;

        $res = array();
        foreach($cached as $wid)
        {
            if($wid >= $since_id)
            {
                $res[] = $wid;
            }
        }

        return $res;
    }

    public function outbox($page = 1, $limit = 30)
    {
        $offset = max(0, $page - 1) * $limit;
        $outbox = new Model_Outbox;
        $outbox_cache = new Model_Cache_Outbox($this);

        $cached = $outbox_cache->fetch($offset, $limit);
        if($cached and count($cached) == $limit)
            return $cached;

        $records = $outbox->where('uid', '=', $this->pk())
            ->limit($limit)
            ->offset($offset)
            ->order_by('wid', 'desc')
            ->find_all()
            ->as_array('wid');

        if( ! $records)
            return $cached;

        $saved = array_keys($records); 
        $outbox_cache->add($saved);

        return $outbox_cache->fetch($offset, $limit);
    }

    public function inbox_count()
    {
        $inbox = new Model_Inbox;
        return $inbox->count_by_user($this->pk());
    }

    public function outbox_count()
    {
        $outbox = new Model_Outbox;
        return $outbox->count_by_user($this->pk());
    }

    public function get_uid($nick)
    {
        $response = Model_API::factory('user')->get_uid(array('nick' => $nick));

        return $response['uid'];
    }

    public function following_of($fuid)
    {
        $response = Model_API::factory('user')->attention_exist(array(
            'uid' => $this->pk(),
            'fuid' => $fuid,
        ));

        return $response;
    }
    
    public function fans_of($fuid)
    {
        $response = Model_API::factory('user')->attention_exist(array(
            'uid' => $fuid,
            'fuid' => $this->pk(),
        ));

        return $response;
    }

    public function like($key)
    {
        return Model_API::factory('user')->like(array('key' => $key));
    }

    public function extend(Model_Star $star)
    {
        if( ! $this->is_star())
        {
            return false;
        }

        $star->reload();
        $this->load();

        $star_info = $star->as_array();
        $base_info = $this->as_array();

        $data = array_merge($base_info, $star_info);

        return $this->_load_values($data);
    }
    
	public function list_message($page = 1, $limit = 10)
	{
		$params = array(
            "uid" => $this->pk(),
            "page" => $page,
            'limit' => $limit,
		);
		$response = Model_API::factory("message")->get_message_all($params);
		
		return $response;
	}
	
	public function send_message($fuid, $content)
	{
		if( empty($content) || empty($fuid) )
		{
			return false;
		}
		
		$data = array(
            "uid" => $this->pk(),
            "fuids" => $fuid,
            "content" => $content
		); 
		
		$response = Model_API::factory("message")->send_message($data);
		
		return $response;
	}
	
	public function rm_message($msg_id)
	{
		if(empty($msg_id))
			return false;
			
		$data = array(
            "uid" => $this->pk(),
            "msg_id" => $msg_id
		);
		
		$response = Model_API::factory("message")->delete_message($data);
		
		return $response;
	}
	
	public function count_message()
	{
		$data = array(
		    "uid" => $this->pk(),
		);
		$response = Model_API::factory("message")->get_collect($data);
		
		return $response;
	}
	
	
	public function list_block($page=1)
	{
    	$data = array(
            "uid" => $this->pk(),
            "page" => $page
    	);
    	
		$result = Model_API::factory('user')->list_block($data);
		
		return $result;
	}
	
    public function add_block($fuids)
    {
    	if(empty($fuids))
    		return false;
    	
    	$data = array(
            "uid" => $this->pk(),
            "fuids" => $fuids
    	);
    		
    	return Model_API::factory("user")->add_block($data);
     }
    
    
    public function delete_block($fuids)
    {
    	if(empty($fuids))
    		return false;
    		
    	$data = array(
            "uid" => $this->pk(),
            "fuids" => $fuids
    	);
    	
    	return Model_API::factory("user")->delete_block($data);
    }
	
    public function count_block()
    {
    	$data = array(
            "uid" => $this->pk()
    	);
    	
    	return Model_API::factory("user")->count_block($data);
    }

	public function get_unread_status()
	{
		$unread = new Model_Unread($this->pk());
		$unread->reload();

		if($unread->loaded())
		{
			return $unread->parse();
		}
		
		return Model_Unread::get_default();
	}

    public function get_source()
    {
        return Model_API::factory('user')->get_user_source(array('uid' => $this->pk()));
    }

    public function get_setting($category, $default = false)
    {
        $setting = new Model_Setting(array('uid' => $this->pk(), 'category' => 0));

        return $setting->get_category($category, $default);
    }
}
