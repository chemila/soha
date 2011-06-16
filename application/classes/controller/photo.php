<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Photo extends Controller_Base {
    public function action_index()
    {
        $this->init_view();
    }

	public function action_xml()
	{
        $array = DB::query(Database::SELECT,
            'SELECT content,media_data from pin_weibo where user_category=1 and type=1 
            order by rand(unix_timestamp()) limit 20'
        )->execute()->as_array();
        $photos = array();

        foreach($array as $value)
        {
            $tmp = unserialize($value['media_data']);
            $photos[] = array(
                'desc' => Text::limit_chars($value['content'], 25, '...'),
                //'url' => $tmp['img']['src'],
                'url' => 'media/img/404.png',
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
