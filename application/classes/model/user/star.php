<?php defined('SYSPATH') or die('No direct script access.');

class Model_User_Star extends Model_User {
    const TABLE_NAME = 'user';

    const TAG_DEFAULT   = 1;
    const TAG_INDUSTRY  = 2;
    const TAG_GRASS     = 4;
    const TAG_OTHERS    = 8;

    protected $_extended_data = array();

    public function init($refresh = false)
    {
        $record = DB::select('*')
            ->from(self::TABLE_NAME)
            ->where('uid', '=', $this->uid)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();

        if( ! $record)
            return false;
        
        $this->_extended_data = $record[0];
        return $this->_data = Arr::overwrite($this->_data, $this->_extended_data);
    }

    /**
     * Insert or update star info locally
     * 
     */
    public function insert_or_update($info)
    {
        $data = array(
            'uid' => $this->uid,       
            'suid' => $info['suid'],
            'nick' => $info['nick'],
            'domain_name' => $info['domain_name'],
            'friends_count' => $info['friends_count'],
            'followers_count' => $info['followers_count'],
            'statuses_count' => $info['statuses_count'],
            'portrait' => $info['portrait'],
            'verified' => $info['verified'],
            'source' => $this->get_source_code($info['source']),
            'created_at' => time(),
            'updated_at' => time(),
            'tag' => $info['tag'],
        );

        if( ! $this->saved())
        {
            return DB::insert(self::TABLE_NAME)
                ->columns(array_keys($data))
                ->values(array_values($data))
                ->execute($this->_db);
        }
        else
        {
            return $this->update($info);
        }
    }

    public function update($info)
    {
        $data = array(
            'suid' => $info['suid'],
            'nick' => $info['nick'],
            'domain_name' => $info['domain_name'],
            'friends_count' => $info['friends_count'],
            'followers_count' => $info['followers_count'],
            'statuses_count' => $info['statuses_count'],
            'portrait' => $info['portrait'],
            'verified' => $info['verified'],
            'source' => $this->get_source_code($info['source']),
            'tag' => $info['tag'],
            'updated_at' => time(), 
        );

        return DB::update(self::TABLE_NAME)
            ->set($data)
            ->where('uid', '=', $this->uid)
            ->execute($this->_db);
    }

    public function saved()
    {
        $res = DB::select("uid")
            ->from(self::TABLE_NAME)
            ->where('uid', '=', $this->uid)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();

        if( ! $res)
            return false;

        return isset($res[0]['uid']);
    }

    public function hot($limit = 90, $page = 1)
    {
        return DB::select('*')->from(self::TABLE_NAME)
            ->order_by('followers_count', 'desc')
            ->limit($limit)
            ->offset($page - 1)
            ->execute($this->_db)
            ->as_array();
    }

    public function count_by_tag($tag = NULL)
    {
        if($tag)
        {
            return DB::select('tag', DB::expr('COUNT(*) AS cnt'))
                ->from(self::TABLE_NAME)
                ->where('tag', '=', $tag)
                ->execute($this->_db)
                ->as_array('tag');
        }
        else
        {
            return DB::select('tag', DB::expr('COUNT(*) AS cnt'))
                ->from(self::TABLE_NAME)
                ->group_by('tag')
                ->execute($this->_db)
                ->as_array('tag');
        }
    }

    public function count_all()
    {
        return DB::select(DB::expr('COUNT(*) AS cnt'))
            ->from(self::TABLE_NAME)
            ->execute($this->_db)
            ->as_array();
    }

    public function followed_by($uid)
    {

    }
}
