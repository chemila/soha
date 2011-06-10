<?php defined('SYSPATH') or die('No direct script access.');

class Model_Outbox extends Model_QORM {
    protected $_table_name = 'outbox';

    public function count_by_user($uid)
    {
		return $this->where('uid', '=', $uid)->count_all();
    }

    public function list_by_user($uid, $limit = 30)
    {
        $records = $this->where('uid', '=', $uid)
            //->and_where('created_at', '>=', strtotime('-10 days'))
            ->order_by('wid', 'desc')
            ->limit($limit)
            ->find_all()
            ->as_array('wid');
        
        if( ! $records)
            return array();

        return array_keys($records);
    }
}
