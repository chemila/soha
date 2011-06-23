<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Photo extends Controller_Base {
    public function action_index()
    {
        $this->init_view();
    }

	public function action_xml()
	{
        $page = $this->get_page();
        $page = min(6, $page);

        $type = $this->request->param('type', 'weibo');
        $classname = 'model_'.$type;
        $model = new $classname;
        $array = $model->photos($page);

        $photos = array();

        foreach($array as $obj)
        {
            if($obj instanceof Model_User)
            {
                $file = preg_replace('~http://(\w+)\.sinaimg\.cn/(\w+)/\d+/(\w+)/(\d+)/?$~i', 
                        'http://\\1.sinaimg.cn/\\2/180/\\3/\\4', $obj->portrait);
                $content = $obj->location.' '.$obj->intro;
                $desc = '@'.$obj->nick.' '.$obj->intro;
            }
            else
            {
                $tmp = unserialize($obj->media_data);
                $file = Arr::get($tmp['img'], 'middle', $tmp['img']['src']);
                $content = $desc = $obj->content;
            }

            $url = $file ? $this->load($file) : 'media/img/404.png';
            $url = str_replace($_SERVER['DOCUMENT_ROOT'], '', $url);

            $json = array(
                'pk' => $obj->pk(),
                'content' => $content,
                'image' => $url,
            );

            $photos[] = array(
                'desc' => Text::limit_chars($desc, 25, '...'),
                'url' => $url,
                'link' => sprintf("details(%s);", json_encode($json)),
            );
        }

        $xml = $this->to_xml($photos);
        die($xml);
	}

    public function action_save()
    {
        $page = $this->get_page();
        $array = Model::Factory('weibo')->photos($page); 

        foreach($array as $value)
        {
            $tmp = unserialize($value['media_data']);
            $url = Arr::get($tmp['img'], 'small', $tmp['img']['src']);

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
        $xml = '<?xml version="1.0" encoding="utf-8"?>'."\r\n";
        $xml .= '<photos>'."\r\n";

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

    public function action_calendar()
    {
        $calendar = new Model_Calendar;
        $weibo = new model_weibo;
        $data = $weibo->where('source', '=', 'sina')
            ->where('type', '=', 1)
            ->order_by(DB::Expr('rand(unix_timestamp())'))
            ->limit(1)
            ->find()
            ->as_array();
        
        $array = unserialize($data['media_data']);
        $image = $array['img']['src'];

        $params = array(
            'title' => Text::limit_chars($data['content'], '100', '...'),
            'icon' => URL::site('media/img/icon/1308731950_images_plus.ico', true),
            'url' => $image,
            'type' => 'image/'.pathinfo($image, PATHINFO_EXTENSION),
        );
        $calendar->create_web_event($params);
        unset($data, $image, $params);

        $user = new model_user;
        $data = $user->where('category', '=', 1)
            ->where('source', '=', 'sina')
            ->order_by(DB::Expr('rand(unix_timestamp())'))
            ->limit(1)
            ->find()
            ->as_array();
        $image = preg_replace('~http://(\w+)\.sinaimg\.cn/(\w+)/\d+/(\w+)/(\d+)/?$~i', 
                'http://\\1.sinaimg.cn/\\2/180/\\3/\\4', $data['portrait']);
        $params = array(
            'title' => Text::limit_chars($data['nick'].' '.$data['intro'], '30', '...'),
            'icon' => URL::site('media/img/icon/1308734578_users-add.ico', true),
            'width' => '180',
            'height' => '180',
            'url' => $image,
            'type' => 'image/'.pathinfo($image, PATHINFO_EXTENSION),
        );
        $calendar->create_web_event($params);
    }

    public function action_delete_event()
    {
        $calendar = new Model_Calendar;
        $start = Arr::get($_GET, 'start', date('Y-m-d'));
        $end = Arr::get($_GET, 'end', date('Y-m-d'));

        $events = $calendar->query_by_date_range($start, $end);

        foreach($events as $event)
        {
            echo 'deleted '.$event->id->text. "<br>";
            $event->delete();
        }
    }
}
