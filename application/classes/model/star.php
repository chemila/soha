<?php defined('SYSPATH') or die('No direct script access.');

class Model_Star extends Model {
    const TABLE_NAME = 'star';

    public function hot($page = 1, $limit = 18)
    {
        return DB::select('*')->from(self::TABLE_NAME)
            ->where('uid', '!=', 0)
            ->limit($limit)
            ->offset($page - 1)
            ->execute($this->_db)
            ->as_array();
    }
}
