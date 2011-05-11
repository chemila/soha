<?php defined('SYSPATH') or die('No direct script access.');

class Model_Star extends ORM {
	protected $_primary_key  = 'uid';
    protected $_table_name = 'user';

    const TAG_DEFAULT   = 1;
    const TAG_INDUSTRY  = 2;
    const TAG_GRASS     = 4;
    const TAG_OTHERS    = 8;

    public function hot($page = 1, $limit = 30)
    {
        return $this->select('*')
            ->where('uid', '!=', 0)
            ->limit($limit)
            ->offset($page - 1)
            ->find_all()
            ->as_array();

    }

    public function extend(Model_User $user)
    {
        $user->load();
        $this->_load();

        $user_info = $user->as_array();
        $base_info = $this->as_array();

        $data = Arr::overwrite($base_info, $user_info);
        return $this->values($data);
    }

    public function overwrite(Model_User $user)
    {
        $user->load();
        $this->_load();

        $user_info = $user->as_array();
        $base_info = $this->as_array();

        $data = Arr::overwrite($user_info, $base_info);
        return $this->values($data);
    }

    /**
     * Insert or update star info locally
     * 
     */
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
}
