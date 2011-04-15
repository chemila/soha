<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends Model {

    public function __construct($id)
    {
        $this->id = $id;
        $this->data = array();
    }

    public function get_info() {
        // get user info through API like: 
        // Remote::get($api_url, 'json');
        $this->data = array(
            'id' => $this->id,
            'name' => 'hello',
            'nick' => 'hello',
        );

        return $this->data;
    }

    public function get_access_token()
    {
        return DB::select('*')
            ->from('user_token')
            ->where('uid', '=', $this->id)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();
    }

    public function get_oauth_src()
    {
        return 'sina';
    }

    public function __tostring()
    {
        if( ! $this->data)
        {
            $this->get_info();
        }

        return $this->id;
    }

    public function save_token($token, $secret)
    {
        return DB::insert('user_token')
            ->columns(array('uid', 'token', 'secret', 'created_at', 'updated_at'))
            ->values(array($this->id, $token, $secret, time(), time()))
            ->execute($this->_db);
    }

    public function has_access_token()
    {
        $record =  DB::select('id')
            ->from('user_token')
            ->where('uid', '=', $this->id)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();

        return ! empty($record);
    }
}
