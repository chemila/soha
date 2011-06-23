<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller_Base {
	public function action_index()
	{
        $this->trigger_error('error');
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

    public function action_oauth()
    {
        $src = 'google';
        session::instance()->set('oauth_src', $src);
        $oauth = new OAuth($src);

        if($callback = $oauth->request_token())
        {
            $this->request->redirect($callback);
        }
        else
        {
            $this->trigger_error('认证失败');
        }
    }

    public function action_delete_event()
    {
        $calendar = new Model_Calendar;
        $start = Arr::get($_GET, 'start', date('Y-m-d'));
        $end = Arr::get($_GET, 'end', date('Y-m-d'));

        $calendar->delete_all();
        die;

        $events = $calendar->query_by_date_range($start, $end);

        foreach($events as $event)
        {
            var_dump($event);die;
            echo 'deleted '.$event->id->text. "<br>";
            $event->delete();
        }
    }
}// End Welcome
