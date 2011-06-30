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
            'foreign_key' => 'fuid',
        ),       
        'followers' => array(
            'model' => 'user_relation',
            'foreign_key' => 'uid',
        ),
        'feeds' => array(
            'modle' => 'weibo',
            'foreign_key' => 'uid',
        ),
        'comments' => array(
            'modle' => 'comment',
            'foreign_key' => 'uid',
        ),
        'ats' => array(
            'modle' => 'atme',
            'foreign_key' => 'uid',
        ),
    );

    public function is_star()
    {
        $this->reload();

        $category = Arr::get($this->_object, 'category', 0);
        return $category == self::CATEGORY_STAR;
    }

    public function get_access_token()
    {
        $token = new Model_User_Token($this->pk());
        return $token->as_array();
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

    public function get_fans_ids($limit = 20, $offset = 0)
    {
        $fans = $this->fans->limit($limit)
            ->offset($offset)
            ->find_all()
            ->as_array('uid');

        return array_keys($fans);
    }

    public function get_fans($limit = 20, $offset = 0)
    {
        $ids = $this->get_fans_ids($limit, $offset);
        $users = array();

        foreach($ids as $uid)
        {
            $users[] = new self($uid);
        }

        return $users;
    }

    public function get_followers_ids($limit = 20, $offset = 0)
    {
        $followers = $this->followers->limit($limit)
            ->offset($offset)
            ->find_all()
            ->as_array('fuid');

        return array_keys($followers);
    }

    public function get_followers($limit = 20, $offset = 0)
    {
        $ids = $this->get_followers_ids($limit, $offset);
        $users = array();

        foreach($ids as $uid)
        {
            $users[] = new self($uid);
        }

        return $users;
    }

    public function get_feeds($limit = 20, $offset = 0)
    {
        return $this->feeds
            ->order_by('forward_count', 'desc')
            ->order_by('comment_count', 'desc')
            ->order_by('id', 'desc')
            ->limit($limit)
            ->offset($offset)
            ->find_all();
    }

    public function load()
    {
        return $this->reload();
    }

    public function is_online()
    {
        return false;
    }
}
