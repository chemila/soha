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

    public function action_ext()
    {
        require_once 'Image/GraphViz.php';

        $graph = new Image_GraphViz();

        $graph->addNode(
          'Node1',
          array(
            'URL'   => 'http://link1',
            'label' => 'This is a label',
            'shape' => 'box'
          )
        );

        $graph->addNode(
          'Node2',
          array(
            'URL'      => 'http://link2',
            'fontsize' => '14'
          )
        );

        $graph->addNode(
          'Node3',
          array(
            'URL'      => 'http://link3',
            'fontsize' => '20'
          )
        );

        $graph->addEdge(
          array(
            'Node1' => 'Node2'
          ),
          array(
            'label' => 'Edge Label'
          )
        );

        $graph->addEdge(
           array(
             'Node1' => 'Node2'
           ),
           array(
            'color' => 'red'
         )
        );
        echo $graph->image();
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
}// End Welcome
