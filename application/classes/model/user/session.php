<?php defined('SYSPATH') or die('No direct script access.');

class Model_User_Session extends Model_QORM {
    protected $_table_name = 'session';
    protected $_primary_key = 'uid';

    protected $_belongs_to = array(
        'user' => array(
            'model' => 'user',
            'foreign_key' => 'uid',
        ),       
    );
}
