<?php defined('SYSPATH') or die('No direct script access.');

class Model_Session extends ORM {
    protected $_table_name = 'session';
    protected $_primary_key = 'uid';
}
