<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo extends Model {
    const TABLE_NAME = 'weibo';

    public function star_news($page = 1, $limit = 18)
    {
        return DB::select('*')->from(self::TABLE_NAME)
            ->where('uid', '!=', 0)
            ->limit($limit)
            ->offset($page - 1)
            ->execute($this->_db)
            ->as_array();
    }
}

