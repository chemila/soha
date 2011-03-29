<?php defined('SYSPATH') or die('No direct script access.');

class Model_Block extends ORM {

    public function all_by_user($uid)
    {
        return DB::select('*')
            ->from($this->_table_name)
            ->where('uid', '=', $uid)
            ->limit(10)
            ->execute($this->_db)
            ->as_array();
    }
}
