<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo extends Model_QORM {
    const TYPE_DEFAULT = 0;
    const TYPE_IMAGE = 1;
    const TYPE_VIDEO = 2;
    const CACHE_VERSION_PREFIX = 'v';
    const CACHE_KEY = 'weibo';

    protected $_table_name = 'weibo';

    protected $_has_one = array(
        'root' => array(
            'model' => 'weibo',
            'foreign_key' => 'rid',
        ),
    );

    protected $_has_many = array(
        'comments' => array(
            'model' => 'comment',
            'foreign_key' => 'wid',
        ),       
    );

    protected $_ignored_columns = array('user');

    public static function instance($type = self::TYPE_DEFAULT, $id = NULL)
    {
        if($type == self::TYPE_DEFAULT)        
        {
            $classname = 'Model_Weibo_Plaintext';
        }
        elseif($type == self::TYPE_IMAGE)
        {
            $classname = 'Model_Weibo_Image';
        }
        elseif($type == self::TYPE_VIDEO)
        {
            $classname = 'Model_Weibo_Video';
        }
        else
        {
            $classname = 'Model_Weibo_Mixed';
        }
        
        return new $classname($id);
    }

    public function star_news($page = 1, $limit = 20, $tag = 1)
    {
        $records = $this->where('user_category', '=', 1)
            ->order_by('timeline', 'desc')
            ->limit($limit)
            ->offset($page - 1)
            ->find_all()
            ->as_array();

        if( ! $records)
            return;

        foreach($records as & $weibo)
        {
            $weibo['media'] = unserialize($weibo['media_data']);

            self::extend_with_user($weibo);
            self::extend_with_root($weibo);
        }

        return $records;
    }

    public function hot_commented($page = 1, $limit = 10)
    {
        $records = $this->select('*')
            ->order_by('comment_count', 'desc')
            ->order_by('timeline', 'desc')
            ->limit($limit)
            ->offset($page - 1)
            ->find_all()
            ->as_array();

        if( ! $records)
            return;

        foreach($records as & $weibo)
        {
            self::extend_with_user($weibo);
        }

        return $records;
    }

    public function is_root()
    {
        if( ! $this->loaded())
        {
            $this->_load();
        }

        return empty($this->rid);
    }

    public function increse_forward()
    {
        $this->_load();

        $this->forward_count ++;
        return $this->save();
    }

    public static function extend_with_user( & $record, $cache_enable = TRUE)
    {
        if( ! $record['uid']) 
            return;

        $cache = Cache::instance('memcache');

        if( ! $cache_enable or ! $user = $cache->get('user.'.$record['uid']))
        {
            $user = new Model_User($record['uid']);
            $user->load();

            $cache->set('user.'.$record['uid'], $user);
        }

        $record['user'] = array(
            'nick' => $user->nick,
            'portrait' => $user->portrait,
            'verified' => $user->verified,
        );
    }

    public static function extend_with_root( & $weibo)
    {
        if( ! $weibo['rid']) 
            return;
        
        $root = new Model_Weibo($weibo['rid']);
        $root->_load();

        if( ! $root->loaded())
            return;

        $weibo['root'] = array(
            'uid' => $root->uid,
            'content' => $root->content,
            'forward_count' => $root->forward_count,
            'comment_count' => $root->comment_count,
            'type' => $root->type,
            'src' => $root->src,
            'timeline' => $root->timeline,
            'media_data' => $root->media_data,
        );

        self::extend_with_user($weibo['root']);
    }

    public function get_media_data()
    {
        throw new Model_Weibo_Exception('Not implemented method :method', array(':method' => __FUNCTION__));
    }

    public function set_media_data(Array $data)
    {
        throw new Model_Weibo_Exception('Not implemented method :method', array(':method' => __FUNCTION__));
    }

    public function get_comments($page = 1, $limit = 10)
    {
        $comments = $this->comments
            ->limit($limit)
            ->offset($page - 1)
            ->order_by('id', 'desc')
            ->find_all()
            ->as_array();
       
        foreach($comments as & $comment)
        {
            self::extend_with_user($comment);
        }

        return $comments;
    }

    
    public function get_user()
    {
        $user = new Model_User($this->uid);

        $user->load();
        return $user;
    }

    public function list_by_user($uid, $page = 1, $limit = 10, & $count = NULL)
    {
        $records = $this->where('uid', '=', $uid)
            ->limit($limit)
            ->offset($page - 1)
            ->order_by('id', 'desc')
            ->find_all()
            ->as_array();

        $count = $this->count_last_query();

        foreach($records as & $record)
        {
            self::extend_with_user($record);
            self::extend_with_root($record);
        }

        return $records;
    }

    public function get_from_ids(Array $wids)
    {
        $result = array();

        foreach($wids as $wid)
        {
            $weibo = new self($wid);
            $data = $weibo->as_array();

            self::extend_with_user($data);
            self::extend_with_root($data);

            $result[] = $data;
        }

        return $result;
    }

    public function ats()
    {
        $pattern = '~@([^\s:：]+)~iu';
        $ats = array();
        
        if(preg_match_all($pattern, $this->content, $match))
        {
            $user = new Model_User;

            foreach($match[1] as $nick)
            {
                try
                {
                    $ats[] = $user->get_uid($nick);
                }
                catch(Exception $e){}
            }
        }

        return $ats;
    }

    public function extend()
    {
        $data = $this->as_array();

        self::extend_with_user($data);
        self::extend_with_root($data);

        return $data;
    }
}
