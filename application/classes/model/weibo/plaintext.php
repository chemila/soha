<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo_Plaintext extends Model_Weibo {

    public function __construct($id = NULL)
    {
        $this->media_data = '';
        $this->type = self::TYPE_DEFAULT;
        
        parent::__construct($id);
    }

    public function get_media_data()
    {
        return NULL;
    }

    public function set_media_data(Array $data)
    {
        return true;
    }
}

