<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo extends ORM {
    const TYPE_DEFAULT = 'plaintext';

    protected $_has_one = array(
        'author' => array(
            'model' => 'user',
            'foreign_key' => 'uid',
        ),       
        'original' => array(
            'model' => 'weibo',
            'foreign_key' => 'original_id',
        ),
    );

    protected $_has_many = array(
        'comments' => array(
            'model' => 'comment',
            'foreign_key' => 'wid',
        ),       
    );

    public function star_news($page = 1, $limit = 18, $tag = 1)
    {
        return DB::select('*')->from($this->_table_name)
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

    public function is_original()
    {
        return empty($this->original_id);
    }

    public function increse_forward()
    {
        if(empty($this->id))
            throw new Model_Weibo_Exception('Check id failed, set id first');

        return DB::update(self::TABLE_NAME)
            ->set(array('forward_count' => DB::expr('forward_count+1')))
            ->where('id', '=', $this->id)
            ->execute($this->_db);
    }

    public function get_original()
    {
        if( ! $this->original_id)
            return NULL;

        return new Model_Weibo($this->original_id);
    }

}
