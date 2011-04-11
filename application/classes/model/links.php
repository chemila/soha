<?php defined('SYSPATH') or die('No direct script access.');

class Model_Links extends ORM {

    public function insert($data)
    {
        try
        {
            return DB::insert('house')
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

    public function all($newhouse = TRUE)
    {
        if($newhouse)
        {
            $rules < 10;
        }
        return DB::select('*')
            ->from($this->_table_name)
            ->where('rules', $newhouse ? "<" : ">=", 10)
            ->execute($this->_db)
            ->as_array();
    }

    public function rules($rules)
    {
        return DB::select('*')
            ->from($this->_table_name)
            ->where('rules', '=', $rules)
            ->execute($this->_db)
            ->as_array();
    }
} 
