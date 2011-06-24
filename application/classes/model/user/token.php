<?php defined('SYSPATH') or die('No direct script access.');

class Model_User_Token extends Model_QORM {
    protected $_table_name = 'user_token';
    protected $_primary_key = 'uid';

    protected $_belongs_to = array(
        'user' => array(
            'model' => 'user',
            'foreign_key' => 'uid',
        ),       
    );

    public function to_access_token()
    {
        $this->reload();
        
        if( ! $this->loaded())
            return;

        return new OAuth_Token_Access(array(
            'token' => $this->token,
            'secret' => $this->secret,
        ));
    }
}
