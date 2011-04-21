<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo extends Model {
    const TABLE_NAME = 'weibo';

    public function star_news($page = 1, $limit = 18, $tag = 1)
    {
        return DB::select('*')->from(self::TABLE_NAME)
            ->order_by('timeline', 'desc')
            ->limit($limit)
            ->offset($page - 1)
            ->execute($this->_db)
            ->as_array();
    }

    public function hot_commented($page = 1, $limit = 10)
    {
        return DB::select('*')->from(self::TABLE_NAME)
            ->order_by('comment_count', 'desc')
            ->order_by('timeline', 'desc')
            ->limit($limit)
            ->offset($page - 1)
            ->execute($this->_db)
            ->as_array();
    }
}

