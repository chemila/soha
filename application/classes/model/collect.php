<?php defined('SYSPATH') or die('No direct script access.');

class Model_Collect extends ORM {

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
            return FALSE;
        }
    }
}
