<?php defined('SYSPATH') or die('No direct script access.');

class Model_Collect extends ORM {

    public static function instance($type)
    {
        $classname = 'Model_Collect_'.ucfirst($type);

        return new $classname;
    }

    public function __construct(){}

    public function insert($data)
    {
        try
        {
            return DB::insert($this->_table_name)
                ->columns(array_keys($data))
                ->values(array_values($data))
                ->execute($this->_db);
        }
        catch(Database_Exception $e)
        {
            // Maybe because of the duplicated key 
            return $e;
        }
    }

    public function insert_or_update($data)
    {
        $this->select("id")
            ->where('uid', '=', $data['uid'])
            ->where('src', '=', $data['src'])
            ->limit(1);
    }

    public function all($page, $limit = 100, $source)
    {
        return DB::select('*')
            ->from($this->_table_name)
            ->where('status', '=', 0)
            ->where('src', '=', $source)
            ->limit($limit)
            ->offset(max(0, $page - 1) * $limit)
            ->execute($this->_db)
            ->as_array();
    }

    public function mark($id)
    {
        return DB::update($this->_table_name)
            ->set(array('status' => 1))
            ->where('id', '=', $id)
            ->execute($this->_db);
    }
}
