<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Photo extends Controller_Base {
    public function action_index()
    {
        $this->init_view();
    }

	public function action_xml()
	{
        $cnt = min(60, Arr::get($_GET, 'cnt', 20));

        $array = DB::query(Database::SELECT,
            'SELECT content,media_data from pin_weibo where user_category=1 and type=1 and source="sina"
            order by id desc limit '.$cnt
        )->execute()->as_array();

        $photos = array();

        foreach($array as $value)
        {
            $tmp = unserialize($value['media_data']);
            $file = Arr::get($tmp['img'], 'middle', $tmp['img']['src']);

            if( ! $file)
            {
                $url = 'media/img/404.png';
            }
            else
            {
                $url = $this->load($file);
            }
            $photos[] = array(
                'desc' => Text::limit_chars($value['content'], 25, '...'),
                'url' => str_replace($_SERVER['DOCUMENT_ROOT'], '', $url),
            );
        }

        $xml = $this->to_xml($photos);
        die($xml);
	}

    public function action_save()
    {
        $cnt = Arr::get($_GET, 'cnt', 20);
        $array = DB::query(Database::SELECT,
            'SELECT content,media_data from pin_weibo where user_category=1 and type=1 and source="sina"
            order by id desc limit '.$cnt
        )->execute()->as_array();

        foreach($array as $value)
        {
            $tmp = unserialize($value['media_data']);
            $url = Arr::get($tmp['img'], 'middle', $tmp['img']['src']);

            if( ! $url)
                continue;

            $this->load($url);
        }
    }

    protected function load($url)
    {
        // Cache file is a hash of the name
        $ext = pathinfo($url, PATHINFO_EXTENSION);
        if( ! $ext)
        {
            $ext = 'jpg';
        }

		$file = sha1($url).'.'.$ext;
        $lifetime = 24 * 3600;
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

    protected function to_xml(array $array)
    {
        $photo = '<photo desc="%s" url="%s" />';

        $xml = '<?xml version="1.0" encoding="utf-8"?>'."\r\n";
        $xml .= '<photos>'."\r\n";

        foreach($array as $value)
        {
            $xml .= sprintf('<photo desc="%s" url="%s" />', $value['desc'], $value['url'])."\r\n";
        }

        $xml .= '</photos>';
        
        return $xml;
    }
}
