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

    public function with_user()
    {
        $user = new Model_User($this->uid);
        $this->user = $user->as_array();

        return $this;
    }

    public function with_weibo()
    {
        $this->weibo->reload();
        $this->weibo->with_user();

        return $this;
    }

    public function extend()
    {
        $this->with_user()->with_weibo();

        return $this;
    }

    public function list_by_user($uid, $page = 1, $limit = 20)
    {
        return $this->where("uid","=", $uid)
            ->offset(max(0, $page - 1) * $limit)
            ->limit($limit)
            ->order_by('id', 'desc')
            ->find_all();
    }

    public function replyed_by_user($uid, $page = 1, $limit = 20)
    {
        return $this->where("rid","=", $uid)
            ->offset(max(0, $page - 1) * $limit)
            ->limit($limit)
            ->order_by('id', 'desc')
            ->find_all();
    }
}
