<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache_Relation extends Model_Cache {
    protected $_user;
    protected $_data = array();
    protected $_cache;

    public function __construct(Model_User $user)
    {
    }

    public function list($page = 1, $limit = 40)
    {
    }

    public function append()
    {
    }
}

