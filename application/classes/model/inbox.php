<?php defined('SYSPATH') or die('No direct script access.');

class Model_Inbox extends Model_QORM {
    protected $_table_name = 'inbox';

    public function count_by_user($uid)
    {
		return $this->where('uid', '=', $uid)->count_all();
    }
}

