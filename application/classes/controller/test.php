<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller_Base {
	public function action_index()
	{
        $this->request->redirect('error/404');
	}

    public function action_debug()
    {
        $arr = array(
            'photo' => array('desc' => 'test', 'url' => 'test.png'),
            'photo' => array('desc' => 'test', 'url' => 'test.png'),
            'photo' => array('desc' => 'test', 'url' => 'test.png'),
        );

        var_dump(Arr::to_xml($arr, 'photos'));
    }

    public function action_pic()
    {
        $this->init_view('pic', 'test');
    }

    public function action_xml()
    {
        $arr = array();
        $arr[] = array(
            'desc' => 'test',
            'url' => 'media/img/404.png',
        );
        $arr[] = array(
            'desc' => 'hello',
            'url' => 'media/img/404.png',
        );
        $photo = '<photo desc="%s" url="%s" />';
        $xml = '<?xml version="1.0" encoding="utf-8"?>'."\r\n";
        $xml .= '<photos>'."\r\n";

        foreach($arr as $value)
        {
            $xml .= sprintf('<photo desc="%s" url="%s" />', $value['desc'], $value['url'])."\r\n";
        }

        $xml .= '</photos>';
        
        die($xml);
    }
}// End Welcome
