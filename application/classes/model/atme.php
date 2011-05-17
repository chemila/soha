<?php defined('SYSPATH') or die('No direct script access.');

class Model_Atme extends Model_QORM {
    protected $_table_name = 'atme';

    public function count_by_user($uid)
    {
		return $this->where('uid', '=', $uid)->count_all();
    }

    public function by_user($uid)
    {
        $records = $this->where('uid', '=', $uid)
            ->order_by("id", "desc")
            ->find_all()
            ->as_array('wid');

        return array_keys($records);
    }
}
