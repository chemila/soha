<?php defined('SYSPATH') or die('No direct script access.');

class Model_Setting extends ORM {
    protected $_has_one = array(
        'user' => array(
            'model' => 'user',            
            'foreign_key' => 'uid',
        ),       
    );

    public function __construct(Model_User $user)
    {
        $this->user = $user;

        parent::__construct();
    }

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

    public function add(Array $data, $category)
    {
        $data['uid'] = $this->user->uid;
        $data['data'] = serialize($data['data']);
        $data['category'] = $category;

        return DB::insert($this->_table_name)
            ->columns(array_keys($data))
            ->values(array_values($data))
            ->execute($this->_db);
    }

    public function update($id, Array $data)
    {
        $data['data'] = serialize($data['data']);

        return DB::update($this->_table_name)
            ->set($data)
            ->where('id', '=', $id)
            ->execute($this->_db);
    }
}

