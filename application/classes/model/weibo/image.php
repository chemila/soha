<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo_Image extends Model_Weibo {
    public static $valid_types = array('jpg', 'png', 'gif', 'jpeg');
    public static $max_allowed_size = '5M';

    const SMALL_WIDTH = 120;
    const SMALL_HEIGHT = 85;
    const MIDDLE_WIDTH = 440;
    const MIDDLE_HEIGHT = 314;

    const TYPE_SMALL = 'small';
    const TYPE_MIDDLE = 'middle';
    const TYPE_LARGE = 'large';
    const TYPE_ORIGIN = 'large';

    public function get_media_data($type = "src")
    {
        $data = unserialize($this->media_data);

        $array = array('src' => $data['img']['src']);
        return Arr::get($array, $type);
    }

    public static function get_path($filename, $type = self::TYPE_ORIGIN)
    {
        $config = Core::config('upload');
        $subdirectory = $type.DIRECTORY_SEPARATOR.substr($filename, 0, 2).DIRECTORY_SEPARATOR;

        return $config->get('path').DIRECTORY_SEPARATOR.$subdirectory;
    }

    public static function get_file($file, $type = self::TYPE_ORIGIN)
    {
        // $file like: /path/to/image/large/12/12fdasf132131.png
        // $path like: large/12/
        return str_replace(array('/large/', '/middle/', '/small/'), "/$type/", $file);
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

        if ( ! $array->check())
            return false;

        $file = md5(microtime().rand()).'.'.strtolower(pathinfo($data[$key]['name'], PATHINFO_EXTENSION));
        $path = self::get_path($file);

        if(Upload::save($data[$key], $file, $path))
        {
            self::resize($path.DIRECTORY_SEPARATOR.$file);
            return self::get_file($file, 'small');
        }
    }

    public static function resize($file, $path)
    {
        $image_small = Image::factory($file);
        $image_middle = Image::factory($file);
        $directory = $path.DIRECTORY_SEPARATOR.$file;
        
        try
        {
            $image_small->resize(self::SMALL_WIDTH, self::SMALL_HEIGHT, Image::INVERSE)
                ->save(self::get_file($directory, 'small'));
            $image_middle->resize(self::MIDDLE_WIDTH, self::MIDDLE_HEIGHT, Image::INVERSE)
                ->save(self::get_file($directory, 'middle'));

            return true;
        }
        catch(CE $e)
        {
            return false;
        }
    }

    public static function upload_rsync(Array $data, $key = 'file')
    {
        $array = Validate::factory($data);

	    $array->rule($key, 'Upload::not_empty');
	    $array->rule($key, 'Upload::type', array(self::$valid_types));
	    $array->rule($key, 'Upload::size', array(self::$max_allowed_size));
	    $array->rule($key, 'Upload::valid');
        if ( ! $array->check())
            return false;

        $config = Core::config('upload');
        $tmp_file = $data[$key]['tmp_name'];
        $filename = md5(microtime().rand()).'.'.strtolower(pathinfo($data[$key]['name'], PATHINFO_EXTENSION));
        $path = self::get_path($filename);

        $small = self::resize($tmp_file, self::TYPE_SMALL);
        $middle = self::resize($tmp_file, self::TYPE_MIDDLE);

        if( ! $small or ! $middle)
            return false;

        if($file = Upload::save($data[$key], $filename, $path))
        {
            $file_small = self::get_file($file, self::TYPE_SMALL);
            $file_middle  = self::get_file($file, self::TYPE_MIDDLE);

            if( ! $small->save($file_small) OR ! $middle->save($file_middle))
                return false;

            $url_original = Model_Upload::rsync_save($file, self::get_path($filename, self::TYPE_ORIGIN));
            $url_small = Model_Upload::rsync_save($file_small, self::get_path($filename, self::TYPE_SMALL));
            $url_middle = Model_Upload::rsync_save($file_middle, self::get_path($filename, self::TYPE_MIDDLE));

            if($url_original and $url_middle and $url_small)
                return $url_small;
        } 
    }

    public static function resize_rsync($file, $type)
    {
        $size = array(
            self::TYPE_SMALL => array(
                'width' => self::SMALL_WIDTH,
                'height' => self::SMALL_HEIGHT,
            ),       
            self::TYPE_MIDDLE => array(
                'width' => self::MIDDLE_WIDTH,
                'height' => self::MIDDLE_HEIGHT,
            ),
        );
        $image = Image::factory($file);
        
        try
        {
            $image->resize($size[$type]['width'], $size[$type]['height'], Image::INVERSE);
            return $image;
        }
        catch(CE $e)
        {
            return false;
        }
    }
}
