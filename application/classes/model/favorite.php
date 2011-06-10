<?php defined('SYSPATH') or die('No direct script access.');

class Model_Favorite extends Model_QORM {

    protected $_belongs_to = array(
        'weibo' => array(
            'model' => 'weibo',
            'foreign_key' => 'wid',
        ),       
    );

	public function add_favorite($data)
	{	
		$row = $this->where("uid", "=", $data['uid'])
			->where("wid", "=", $data['wid'])
	        ->limit(1)
	        ->find()
	        ->as_array();
	    
		if( !isset($row[1]) )
		{	
			$this->uid = $data['uid'];
			$this->wid = $data['wid'];
			$this->created_at = time();
			$this->save();

        	return $this->saved();
		}
	}
	
    public function list_by_user($uid, $page = 1, $limit = 20)
    {
    	return $this->where("uid", "=", $uid)
                ->order_by("id", "desc")
                ->limit($limit)
                ->offset(($page - 1) * $limit)
                ->find_all();
    }

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
        $this->weibo->extend();

        return $this;
    }

    public function extend()
    {
        $this->with_weibo();

        return $this;
    }
    
    public function rm_favorite()
    {
    	return $this->delete();
    }
}

