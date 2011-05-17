<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo_Image extends Model_Weibo {
    public static $upload_directory = 'media/upload';
    public static $valid_types = array('jpg', 'png', 'gif', 'jpeg');
    public static $max_allowed_size = '5M';

    const SMALL_WIDTH = 120;
    const SMALL_HEIGHT = 85;
    const MIDDLE_WIDTH = 440;
    const MIDDLE_HEIGHT = 314;

    public function get_media_data($type = "src")
    {
        $this->_load();
        $data = unserialize($this->media_data);

        return array(
            'src' => $data['img']['src'],
        );
    }

    public static function get_relative_path($filename, $type = 'large')
    {
        return self::$upload_directory.DIRECTORY_SEPARATOR.$type.DIRECTORY_SEPARATOR.substr($filename, 0, 2).DIRECTORY_SEPARATOR;
    }

    public static function get_abs_path($filename, $type = 'large')
    {
        return DOCROOT.self::get_relative_path($filename, $type);
    }

    public static function get_relative_file($filename, $type = 'large')
    {
        return self::get_relative_path($filename, $type).$filename;
    }

    public static function get_abs_file($filename, $type = 'large')
    {
        return self::get_abs_path($filename, $type).$filename;
    }

    public function set_media_data(Array $data)
    {
        if(isset($data['image']))
        {
            $src = $data['image'];
        }
        else
        {
            $src = self::upload($data);
        }

        $this->media_data = serialize(array(
            'img' => array(
                'src' => $src,
            ),                
        ));

        return $this;
    }

    public static function upload(Array $data, $key = 'file')
    {
        $array = Validate::factory($data);

	    $array->rule($key, 'Upload::not_empty');
	    $array->rule($key, 'Upload::type', array(self::$valid_types));
	    $array->rule($key, 'Upload::size', array(self::$max_allowed_size));
	    $array->rule($key, 'Upload::valid');

        if ($array->check())
        {
            // Upload is valid, save it
            $filename = md5(microtime().rand());
            $ext = strtolower(pathinfo($data[$key]['name'], PATHINFO_EXTENSION));
            $file = $filename.'.'.$ext;
            $directory = self::get_abs_path($filename);

            if(Upload::save($data[$key], $file, $directory))
            {
                self::resize($file);
                return $file;
            }
        } 
        else
        {
            return $array->errors();
        }
    }

    public static function resize($filename)
    {
        $image1 = Image::factory(self::get_abs_file($filename));
        $image2 = Image::factory(self::get_abs_file($filename));
        
        try
        {
            $image1->resize(self::SMALL_WIDTH, self::SMALL_HEIGHT, Image::INVERSE)
                   ->save(self::get_abs_file($filename, 'small'));
            $image2->resize(self::MIDDLE_WIDTH, self::MIDDLE_HEIGHT, Image::INVERSE)
                   ->save(self::get_abs_file($filename, 'middle'));
        }
        catch(CE $e)
        {
            return false;
        }

        return true;
    }
}
