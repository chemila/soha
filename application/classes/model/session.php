<?php defined('SYSPATH') or die('No direct script access.');

class Model_Session extends Model {
    const TABLE_NAME = 'session';
    const MAX_LIFETIME = 2592000; // 1 month
    
    public function create($sid, Array $data)
    {
        $to_insert = array(
            'updated_at' => time(),
            'sid' => $sid,
            'data' => serialize($data),
        );

        return DB::insert(self::TABLE_NAME)
            ->columns(array_keys($to_insert))
            ->values(array_values($to_insert))
            ->execute($this->_db);
    }

    public function read($sid)
    {
        $records = DB::select('*')
            ->from(self::TABLE_NAME)
            ->where('sid', '=', $sid)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();

        if( ! $records)
            return array();

        return unserialize($records[0]['data']);
    }

    public function write($sid, Array $data)
    {
        $to_update = array(
            'updated_at' => time(),
            'data' => serialize($data),
        );

        return DB::update(self::TABLE_NAME)
            ->set($to_update)
            ->where('sid', '=', $sid)
            ->execute($this->_db);
    }

    public function create_or_write($sid, Array $data)
    {
        $exist = $this->read($sid);

        if($exist)
        {
            return $this->write($sid, $data);
        }
        else
        {
            return $this->create($sid, $data);
        }
    }

    public function destroy($sid)
    {
        return DB::delete(self::TABLE_NAME)
            ->where('sid', '=', $sid)
            ->execute($this->_db);
    }

    public function gc($maxlifetime = self::MAX_LIFETIME)
    {
        return DB::delete(self::TABLE_NAME)
            ->where('updated_at', '<', time() - $maxlifetime)
            ->execute($this->_db);
    }
}
