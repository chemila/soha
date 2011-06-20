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
        'inbox' => array(
            'model' => 'inbox',
            'foreign_key' => 'wid',
        ),
        'outbox' => array(
            'model' => 'outbox',
            'foreign_key' => 'wid',
        ),
    );

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

    public function extend()
    {
        $this->with_user();
        $this->root->find($this->rid)->with_user();

        return $this;
    }

    public function with_user()
    {
        $user = new Model_User($this->uid);
        $this->user = $user->as_array();

        return $this;
    }

    public function star_news($page = 1, $limit = 20)
    {
        return $this->where('user_category', '=', Model_User::CATEGORY_STAR)
            ->order_by('timeline', 'desc')
            ->limit($limit)
            ->offset(max(0, $page - 1) * $limit)
            ->find_all();
    }

    public function hot_commented($page = 1, $limit = 20)
    {
        return $this->where('user_category', '=', Model_User::CATEGORY_STAR)
            ->order_by('comment_count', 'desc')
            ->order_by('id', 'desc')
            ->limit($limit)
            ->offset(max(0, $page - 1) * $limit)
            ->find_all();
    }

    public function is_root()
    {
        $this->_load();
        return empty($this->rid);
    }

    public function increse_forward()
    {
        $this->_load();
        $this->forward_count ++;
        return $this->save();
    }

    public function get_media_data()
    {
        throw new Model_Weibo_Exception('Not implemented method :method', array(':method' => __FUNCTION__));
    }

    public function set_media_data(Array $data)
    {
        throw new Model_Weibo_Exception('Not implemented method :method', array(':method' => __FUNCTION__));
    }

    public function get_user()
    {
        $user = new Model_User($this->uid);

        $user->load();
        return $user;
    }

    public function get_comments($page = 1, $limit = 10)
    {
        return $this->comments->order_by('id', 'desc')
            ->limit($limit)
            ->offset(max($page - 1, 0) * $limit)
            ->find_all();
    }

    public function list_by_user($uid, $page = 1, $limit = 10)
    {
        return $this->where('uid', '=', $uid)
            ->limit($limit)
            ->offset(max(0, $page - 1) * $limit)
            ->order_by('id', 'desc')
            ->find_all();
    }

    public function get_from_ids(Array $wids = NULL)
    {
        if( ! $wids)
            return;

        $result = array();
        foreach($wids as $wid)
        {
            $weibo = new self($wid);
            $weibo->reload();

            if( ! $weibo->loaded())
            {
                continue;
            }

            $result[] = $weibo->extend()->as_array();
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

    public function save_shadow(Model_Collect_Weibo $shadow)
    {
        $this->values($shadow->as_array());
        $this->uid = NULL;
        $this->id = NULL;

        $star = new Model_Star(array('suid' => $shadow->uid, 'source' => $shadow->source));

        if($star->pk())
        {
            $this->uid = $star->pk();
            $this->user_category = Model_User::CATEGORY_STAR;
        }
        else
        {
            //$this->uid = ($star->observer ? $star->observer : '1005142');
            $this->uid = $star->get_observer($shadow->source);
            $this->user_category = Model_User::CATEGORY_DEFAULT;
        }
        unset($star);

        // Init count
        $this->forward_count = 0;
        $this->comment_count = 0;

        $this->save();

        if( ! $this->saved())
            return false;
       
        $ats = $this->ats();
        if($ats)
        {
            foreach($ats as $at)
            {
                $atme = new Model_Atme;

                $atme->wid = $this->pk();
                $atme->uid = $at;
                $atme->push();
            }
        }

        // Update user statuses_count 
        $user = new Model_User($this->uid);
        $fans = $user->get_fans_ids();

        $user->load();
        $user->statuses_count ++;
        $user->save();

        // Send to outbox and push into users inboxes
		$outbox = new Model_Cache_Outbox($user);
        $users = array_merge($ats, $fans);
        $outbox->receive($this->pk())->push($users);
        unset($outbox, $user);

        // Update shadow wid
        $shadow->wid = $this->pk();
        $shadow->save();

        if( ! $shadow->saved())
            return false;

        // Update shadow children wrid 
        $children = $shadow->children->find_all();
        unset($shadow);

        if( ! $children)
            return true;

        $increase = 0;
        foreach($children as $child)
        {
            if($child->wid != 0)
                continue;

            $child->rid = $this->pk();
            
            // Save child recursivly as well
            $weibo_child = new self;
            $weibo_child->save_shadow($child) and $increase ++;
        }

        $this->reload();
        $this->forward_count += $increase;
        $this->save();
        
        return $this->saved();
    }

    public function access_oauth($data)
    {
        $pk = $data[0];
        $this->find($pk);

        if( ! $this->loaded())
            return false;

        $params = array(
            'content' => $this->content,
            'id' => $pk,
        );

        $user = new Model_User($this->uid);
        $source = $user->get_source();
        $token = $user->get_access_token();

        if( ! $token or ! $source)
            return false;

        $oauth = new OAuth($source, $token);
        $model_oauth = Model_OAuth::factory($oauth);

        if($this->is_root())
        {
            $params['content'] = $this->content;
            if($this->type == self::TYPE_IMAGE)
            {
                $media_data = $this->media_data;
            }
        }
        else
        {
            $weibo_shadow = new Model_Collect_Weibo;

            // Forward from the same plateform
            if($sid = $weibo_shadow->get_sid($this->rid, $source))
            {
                $params['sid'] = $sid;
            }
            else
            {
                $this->root->find($this->rid);

                if($this->root->loaded())
                {
                    $params['content'] = $this->content.$this->root->content;
                    // Upload the image from the other
                    if($this->root->type == self::TYPE_IMAGE)
                    {
                        $media_data = $this->root->media_data;
                    }
                }
            }
        }

        if(isset($media_data))
        {
            $array = unserialize($media_data);

            if(is_array($array))
            {
                $img = Arr::get($array, 'img', false);
                if(is_array($img) and $src = Arr::get($img, 'src', false))
                {
                    $params['pic'] = Model_Weibo_Image::get_file($src);
                }
            }
        }

        return $model_oauth->publish_status($params);
    }

    public function photos($page = 1)
    {
        return $this->where('user_category', '=', 1)
            ->where('type', '=', 1)
            ->where('source', '=', 'sina')
            ->order_by('id', 'desc')
            ->limit(20)
            ->offset(($page - 1) * 20)
            ->find_all();
    }
}
