<?php defined('SYSPATH') or die('No direct script access.');

class Model_Photo {

    public static function load($url)
    {
        // Cache file is a hash of the name
        $ext = pathinfo($url, PATHINFO_EXTENSION);
        if( ! $ext)
        {
            $ext = 'jpg';
        }

		$file = sha1($url).'.'.$ext;
        $config = core::config('upload');

		// Cache directories are split by keys to prevent filesystem overload
		$dir = $config->get('path').DIRECTORY_SEPARATOR.$file[0].$file[1].DIRECTORY_SEPARATOR;

        if (is_file($dir.$file))
        {
            return $dir.$file;
        }

		if ( ! is_dir($dir))
		{
			// Create the cache directory
			mkdir($dir, 0777, TRUE);

			// Set permissions (must be manually set to fix umask issues)
			chmod($dir, 0777);
		}
        
        $data = @file_get_contents($url);

        if( ! $data)
            return FALSE;

        if(file_put_contents($dir.$file, $data, LOCK_EX))
            return $dir.$file;

        return FALSE;
    }

    public static function to_xml(array $array)
    {
        $xml = '<?xml version="1.0" encoding="utf-8"?>'."\r\n";
        $xml .= '<photos>'."\r\n";

        if(empty($array))
        {
            $array[] = array(
                'desc' => 'Sorry, data not found! Try others please.',
                'url' => '/media/img/404.png',
                'link' => '#',
            );
        }

        foreach($array as $photo)
        {
            $tmp = '<photo ';
            foreach($photo as $attr => $value)
            {
                $tmp .= sprintf("%s='%s' " , $attr, $value);
            }
            $tmp .= '/>'."\r\n";

            $xml .= $tmp;
        }

        $xml .= '</photos>';
        
        return $xml;
    }


    public static function get_image_size($image, $max_width = 180, $max_height = 180)
    {
        if(0 !== strpos('http://', $image))
        {
            $image = URL::site($image, true);
        }

        $image_info = @getimagesize($image);

        if( ! $image_info)
        {
            return array(800, 600, 'image/jpg');
        }

        $type = $image_info['mime'];

        list($width, $height) = $image_info;

        $ratioh = ceil($max_height/$height); 
        $ratiow = ceil($max_width/$width); 
        $ratio = min($ratioh, $ratiow); 
        // New dimensions 
        $width = intval($ratio*$width); 
        $height = intval($ratio*$height); 

        return array(
            'width' => $width, 
            'height' => $height, 
            'type' => $type,
        );
    }
}

