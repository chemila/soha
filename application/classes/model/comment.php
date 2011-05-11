<?php defined('SYSPATH') or die('No direct script access.');

class Model_Comment extends Model_QORM {
    protected $_table_name = 'comment';

    protected $_belongs_to = array(
        'weibo' => array(
            'model' => 'weibo',
            'foreign_key' => 'wid',
        ),       
    );

    protected $_has_one = array(
        'root' => array(
            'model' => 'comment',
            'foreign_key' => 'comment_to',
        ),
    );

    public function list_by_user_count($uid)
    {
    	$comments_count = $this
        	->where("uid","=", $uid)
            ->find_all()
            ->as_array();
        
        return $comments_count;
    }
    
    public function list_by_user($uid, $page = 1, $limit = 20)
    {
        $comments = $this
        	->where("uid","=", $uid)
            ->offset($page - 1)
            ->limit($limit)
            ->order_by('created_at', 'desc')
            ->find_all()
            ->as_array();

        foreach($comments as & $comment)
        {
            self::extend_with_weibo($comment);
        }

        return $comments;
    }

    public static function extend_with_weibo(& $comment) 
    {
        $wid = $comment['wid'];
        
        $weibo = new Model_Weibo($wid);
        
        $comment['weibo']  = array(
            'content' => $weibo->content,
            'user' => $weibo->get_user(array('uid', 'nick', 'portrait'))->as_array(),
        );
    }
    
    public static function extend_reply_user(& $comment) 
    {
        $uid = $comment['uid'];
        
        $user = new Model_User($uid);
        $user->load();
        $userinfo = $user->as_array();
        
        $comment['reply_user']  = array("user"=>$userinfo);
    }
    
    public function list_by_wid($uid, $page = 1, $limit = 10)
    {
    	$comments = $this
    		->join("weibo")
    		->on("wid", "=", "weibo.id")
        	->where("weibo.uid","=", $uid)
            ->offset($page - 1)
            ->limit($limit)
            ->order_by('created_at', 'desc')
            ->find_all()
            ->as_array();
        
        foreach($comments as & $comment)
        {
            self::extend_with_weibo($comment);
            self::extend_reply_user($comment);
        }  
          
        return $comments;
    }
    
    public function add_comment($data)
    {
		$content = Arr::get($data, "content", '');
		$reply_uid = Arr::get($data, "reply_uid", '');
		$wid = Arr::get($data, "wid", '');
		
		if(empty($content) || empty($reply_uid) || empty($wid))
			return ;
		
		$this->uid = $reply_uid;
		$this->content = $content;
		$this->created_at = time();
		$this->wid = $wid;
		
		$this->save();
		
		return true;
    }
}
