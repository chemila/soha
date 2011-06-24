<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends ORM {
    const CATEGORY_DEFAULT = 0;
    const CATEGORY_STAR    = 1;

	protected $_primary_key  = 'uid';
    protected $_table_name = 'member';

    protected $_has_one = array(
        'session' => array(
            'model' => 'user_session',
            'foreign_key' => 'uid',
        ),       
        'setting' => array(
            'model' => 'user_setting',
            'foreign_key' => 'uid',
        ),       
        'token' => array(
            'model' => 'user_token',
            'foreign_key' => 'uid',
        ),       
        'favorite' => array(
            'model' => 'user_favorite',
            'foreign_key' => 'uid',
        ),       
    );

    protected $_has_many = array(
        'fans' => array(
            'model' => 'user_relation',
            'foreign_key' => 'uid',
        ),       
        'followers' => array(
            'model' => 'user_relation',
            'foreign_key' => 'fuid',
        ),
    );

    public function load()
    {
        return $this->reload();
    }

    public function is_star()
    {
        $this->load();

        $category = Arr::get($this->_object, 'category', 0);
        return $category == self::CATEGORY_STAR;
    }

    public function pk($uid = NULL)
    {
        if($uid)
        {
            $this->_object[$this->_primary_key] = $uid;
        }

        return $this->_object[$this->_primary_key];
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

        if(isset($response['result']))
		    return $response['result'];

        return false;
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
            if($wid > $since_id)
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
        $inbox_cache = new model_cache_inbox($this);

        return max($inbox->count_by_user($this->pk()), $inbox_cache->count());
    }

    public function outbox_count()
    {
        $outbox = new Model_Outbox;
        return $outbox->count_by_user($this->pk());
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

    public function photos($page)
    {
        return $this->where('category', '=', 1)
            ->where('source', '=', 'sina')
            ->limit(20)
            ->offset(($page - 1) * 20)
            ->order_by('followers_count', 'desc')
            ->find_all();
    }
}
