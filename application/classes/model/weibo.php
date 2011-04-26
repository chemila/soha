<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo extends ORM {
    const TYPE_DEFAULT = 0;
    const TYPE_IMAGE = 1;
    const TYPE_VIDEO = 2;
    const CACHE_VERSION_PREFIX = 'v';

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
            $classname = 'plaintext';
        }
        elseif($type == self::TYPE_IMAGE)
        {
            $classname = 'image';
        }
        elseif($type == self::TYPE_VIDEO)
        {
            $classname = 'video';
        }
        else
        {
            $classname = 'mixed';
        }
        
        return new $classname($id);
    }

    public function star_news($page = 1, $limit = 18, $tag = 1)
    {
        $records = $this->select('*')
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

            if($weibo['rid'])
            {
                self::extend_with_root($weibo);
            }
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
            throw new Model_Weibo_Exception('Load this model first');

        return empty($this->rid);
    }

    public function increse_forward()
    {
        if( ! $this->loaded())
            throw new Model_Weibo_Exception('Load this model first');

        $this->forward_count += 1;
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
            'media' => unserialize($root->media_data),
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

    public function get_comments($page, $limit = 10)
    {
        $comments = $this->comments
            ->limit($limit)
            ->offset($page - 1)
            ->find_all()
            ->as_array();
       
        foreach($comments as & $comment)
        {
            self::extend_with_user($comment);
        }

        return $comments;
    }

    public function save_sync()
    {
        $mq = Queue::instance();
        $mq->create('weibo');
        
        $version = $this->get_current_version();
        $this->cache_version = self::CACHE_VERSION_PREFIX.$version;
        $mq->send($version, $this->as_array());

        return $version;
    }

    public function get_current_version()
    {
        $cache = Cache::instance();

        $version = $cache->get('weibo:version', time());
        $version ++;

        $cache->set('weibo:version', $version);
        return $version;
    }
}
