<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller_Base {
	public function action_index()
	{
        $this->request->redirect('error/404');
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

    public function action_calendar()
    {
        $calID = core::config('calendar')->get('id');
        Zend_Loader::loadClass('Zend_Gdata');
        Zend_Loader::loadClass('Zend_Gdata_AuthSub');
        Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
        Zend_Loader::loadClass('Zend_Gdata_Calendar');
        $gdataCal = new Zend_Gdata_Calendar();
        $query = $gdataCal->newEventQuery();
        //原始范例中setUser给的参数是default 这样的话是开启范例中$client的主日历
        //但由网页说明中我们可知用$cal可以开启我们指定的任何一本日历
        $query->setUser($calID);
        $query->setVisibility('public');
        $query->setProjection('full');
        $query->setOrderby('starttime');
        $query->setStartMin('2011-02-01');
        $query->setStartMax('2011-07-29');
        $eventFeed = $gdataCal->getCalendarEventFeed($query);
        foreach($eventFeed as $event){//在同一个query中能显示的事件数量上限为25笔
            echo core::debug($event);
            /**
            foreach ($event->when as $when) {
                echo "startTime:" . $when->startTime . "\n";//事件起始时间
                echo "endTime:" . $when->endTime . "\n";//事件结束时间
            }
            echo "recurrence:" . @$event->recurrence->text . "\n";//循环事件才有内容

            foreach ($event->where as $where) {
                echo "where:" . $where->valueString . "\n";//地点
            }
            echo "content:" . $event->content->text . "\n";//详情
            echo "updated:" . $event->updated->text . "\n";//最后修改时间
            echo "title:" . $event->title->text . "\n";//事项
            echo "id:" . $event->id->text . "\n\n";//事件id(平时看不到)
            **/
        }
    }
}// End Welcome
