<?php defined('SYSPATH') or die('No direct script access.');

class Model_Setting extends ORM {
    protected $_has_one = array(
        'user' => array(
            'model' => 'user',            
            'foreign_key' => 'uid',
        ),       
    );

    public function get($category, $attr = NULL)
    {
        $data = DB::select('*')->from($this->_table_name)
            ->where('uid', '=', $this->user->uid)
            ->where('category', '=', $category)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();

        $data[0]['data'] = unserialize($data[0]['data']);

        return isset($attr) ? $data[0][$attr] : $data[0];
    }
}

