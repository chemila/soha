<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo_Image extends Model_Weibo {
    public static $upload_directory = '/tmp';
    public static $valid_types = array('jpg', 'png', 'gif', 'jpeg');
    public static $max_allowed_size = '5M';

    public function get_media_data()
    {
        $this->_load();
        $data = unserialize($this->media_data);

        return array(
            'src' => self::$upload_directory.DIRECTORY_SEPARATOR.$data['image']['src'],       
        );
    }

    public function set_media_data(Array $data)
    {
        if($file = self::upload($data))
        {
            $this->media_data = serialize(array(
                'image' => array(
                    'src' => $file,
                ),                
            ));
        }

        return $this;
    }

    public static function upload(Array $data)
    {
        $array = Validate::factory($data);

	    $array->rule('file', 'Upload::not_empty');
	    $array->rule('file', 'Upload::type', array(self::$valid_types));
	    $array->rule('file', 'Upload::size', array(self::$max_allowed_size))
	    $array->rule('file', 'Upload::valid')

        if ($array->check())
        {
            // Upload is valid, save it
            return self::$upload_directory.DIRECTORY_SEPARATOR.Upload::save($data['file']);
        } 
    }
}
