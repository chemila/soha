<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller_Base {
	public function action_index()
	{
        $this->init_view();
        var_dump($this->request->directory);die;
	}

    public function action_debug()
    {
        if( ! $_FILES)
        {
            echo<<<HTML
            <form action="/test/debug" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" />
                <input type="submit" value="submit" />
            </form>
HTML;
            die;
        }
        else
        {
            $config = Core::config('upload');
            $path = $config->get('path');
            $file = 'test.png';

            if($res = Upload::save($_FILES['file'], $file, $path))
            {
                var_dump($path.DIRECTORY_SEPARATOR.$file);
            }
            else
            {
                var_dump($res);
            }
        }
    }

    public function action_chart()
    {
        echo <<<HTML
<html>
  <head>
    <script type='text/javascript' src='/media/js/google_jsapi.js'></script>
    <script type='text/javascript'>
      google.load('visualization', '1', {packages:['orgchart']});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');
        data.addRows([
          [{v:'jingxian', f:'wangjingxian<div style="color:red; font-style:italic">President</div>'}, '', 'The President'],
          [{v:'erxiao', f:'wangerxiao<div style="color:red; font-style:italic">Vice President</div>'}, 'jingxian', 'VP'],
          [{v:'fuqiang', f:'<h2>付强</h2>总统'}, 'erxiao', ''],
          ['wangsanxiao', 'jingxian', 'sanshui'],
          ['wangsixiao', 'jingxian', '']
        ]);
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
        chart.draw(data, {allowHtml:true});
      }
    </script>
  </head>

  <body>
    <div id='chart_div'></div>
  </body>
</html>
HTML;
    } 

    public function action_social()
    {
        var_dump(url::site('/media/img/portrait/default_180.png', true));
    }

    public function action_orm()
    {
        $user = new model_user(1005142);
        $fans = $user->fans->find_all();
        var_dump(array_keys(array()));
        var_dump($fans->as_array());
        $token  = $user->token->reload();
        var_dump($token->loaded());
        $session  = $user->session->reload();
        var_dump($session->as_array());
    }

    public function action_db()
    {
        $weibo = new model_weibo;
        $data = $weibo->where('type', '=', '1')
            ->where('img', '=', '')
            ->order_by('id', 'desc')
            ->find_all();

        foreach($data as $obj)
        {
            $array = unserialize($obj->media_data);
            $obj->img = arr::path($array, 'img.src', '/media/img/404.png');
            $obj->save();
        }
    }

    public function action_calendar()
    {
        $calendar = new Model_Calendar;
        $weibo = new model_weibo;
        $data = $weibo->where('img', '!=', '')
            ->order_by(DB::Expr('rand(unix_timestamp())'))
            ->limit(1)
            ->find()
            ->as_array();
        
        $image = $data['img'];
        $params = array(
            'title' => Text::limit_chars($data['content'], '80', '...'),
            'icon' => URL::site('media/img/icon/1308731950_images_plus.ico', true),
            'url' => $image,
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
            'title' => Text::limit_chars($data['nick'].' 来自：'.$data['location'], '50', '...'),
            'icon' => URL::site('media/img/icon/1308734578_users-add.ico', true),
            'width' => 180,
            'height' => 180,
            'url' => $image,
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

}// End Welcome
