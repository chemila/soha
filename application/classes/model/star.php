<?php defined('SYSPATH') or die('No direct script access.');

class Model_Star extends ORM {
	protected $_primary_key  = 'uid';
    protected $_table_name = 'user';

    const TAG_DEFAULT   = 1;
    const TAG_INDUSTRY  = 2;
    const TAG_GRASS     = 4;
    const TAG_OTHERS    = 8;

    public function hot($limit = 30, $page = 1)
    {
        return $this->where('uid', '!=', 0)
            ->order_by('followers_count', 'desc')
            ->order_by('statuses_count', 'desc')
            ->limit($limit)
            ->offset(max(0, $page - 1) * $limit)
            ->find_all()
            ->as_array();
    }
    
    public function search_key($nick, $limit=30)
    {
    	 return $this->where('nick', ' like ', $nick."%")
    	 	->limit($limit)
            ->order_by('followers_count', 'desc')
            ->order_by('statuses_count', 'desc')
            ->find_all()
            ->as_array();
    }
    
    public function search_en_prefix($key, $limit=120)
    {
    	  return $this->where('en_prefix', '=', $key)
    	  	->limit($limit)
            ->order_by('followers_count', 'desc')
            ->order_by('statuses_count', 'desc')
            ->find_all()
            ->as_array();
    }

    public function extend(Model_User $user)
    {
        $user->load();
        $this->_load();

        $user_info = $user->as_array();
        $base_info = $this->as_array();

        $data = array_merge($user_info, $base_info);

        return $this->_load_values($data);
    }

    public function insert_or_update(Array $info)
    {
        $default = array(
            'created_at' => time(),
            'updated_at' => time(),
        );

        $info = $info + $default;
        $this->values($info);

        $this->save();

        return $this->saved();
    }

    public function exists()
    {
        return DB::select("uid")
            ->from($this->_table_name)
            ->where('uid', '=', $this->pk())
            ->limit(1)
            ->execute($this->_db)
            ->get('uid');
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

    public function followed_by($uid, $limit = 10, $offset = 0)
    {
        return $this->where('uid', '=', $uid)
            ->limit($limit)
            ->offset($offset)
            ->find_all();
    }

    public function check_exist($suid, $src = '1')
    {
        return $this->where('suid', '=', $suid)
            ->and_where('source', '=', $src)
            ->limit(1)
            ->find()
            ->pk();
    }

    public function get_observer($source)
    {
        if($this->observer)
            return $this->observer;

        $config = Core::config('admin')->get($source);

        return $config[0];
    }
}
