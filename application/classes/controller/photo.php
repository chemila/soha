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
            'SELECT content,media_data from pin_weibo where user_category=1 and type=1 
            order by rand(unix_timestamp()) limit '.$cnt
        )->execute()->as_array();
        $photos = array();

        foreach($array as $value)
        {
            $tmp = unserialize($value['media_data']);
            $file = Arr::get($tmp['img'], 'middle', $tmp['img']['src']);

            if( ! $file)
                continue;

            $ext = pathinfo($file, PATHINFO_EXTENSION);
            if( ! $ext)
            {
                $ext = 'jpg';
            }

            $url = Core::cache($file, file_get_contents($file), 24*3600, );

            $photos[] = array(
                'desc' => Text::limit_chars($value['content'], 25, '...'),
                //'url' => $tmp['img']['src'],
                'url' => str_replace(Core::$cache_dir, '', $url),
            );
        }

        $xml = $this->to_xml($photos);
        die($xml);
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
