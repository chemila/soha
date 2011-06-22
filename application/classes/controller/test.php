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

    public function action_calendar()
    {
        $calID = core::config('google')->get('calendar');
        $gdataCal = new Zend_Gdata_Calendar();
        $query = $gdataCal->newEventQuery();

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

    public function createEvent ($client, $title = 'Tennis with Beth',
        $desc='Meet for a quick lesson', $where = 'On the courts',
        $startDate = '2008-01-20', $startTime = '10:00',
        $endDate = '2008-01-20', $endTime = '11:00', $tzOffset = '-08')
    {
        $gc = new Zend_Gdata_Calendar($client);
        $newEntry = $gc->newEventEntry();

        $newEntry->title = $gc->newTitle(trim($title));
        $newEntry->where  = array($gc->newWhere($where));
        $newEntry->content = $gc->newContent($desc);
        $newEntry->content->type = 'text';

        $when = $gc->newWhen();
        $when->startTime = "{$startDate}T{$startTime}:00.000{$tzOffset}:00";
        $when->endTime = "{$endDate}T{$endTime}:00.000{$tzOffset}:00";
        $newEntry->when = array($when);

        $createdEntry = $gc->insertEvent($newEntry);
        return $createdEntry->id->text;
    }

    public function action_event()
    {
        $client = new Zend_Gdata_HttpClient();
        $session = Core::config('google')->get('authsub_session');
        $client->setAuthSubToken($session);

        $service = new Zend_Gdata_Calendar($client);
        // Create a new entry using the calendar service's magic factory method
        $event= $service->newEventEntry();
         
        // Populate the event with the desired information
        // Note that each attribute is crated as an instance of a matching class
        $event->title = $service->newTitle("My Event");
        $event->where = array($service->newWhere("Mountain View, California"));
        $event->content =
                $service->newContent(" This is my awesome event. RSVP required.");
         
        // Set the date using RFC 3339 format.
        $startDate = "2010-06-22";
        $startTime = "11:00";
        $endDate = "2010-06-22";
        $endTime = "24:00";
        $tzOffset = "-08";
         
        $when = $service->newWhen();
        $when->startTime = "{$startDate}T{$startTime}:00.000{$tzOffset}:00";
        $when->endTime = "{$endDate}T{$endTime}:00.000{$tzOffset}:00";
        $event->when = array($when);
         
        // Upload the event to the calendar server
        // A copy of the event as it is recorded on the server is returned
        $newEvent = $service->insertEvent($event);
    }

    public function action_failed()
    {
        $config = core::config('google')->get('oauth');

        $accessToken = new Zend_Oauth_Token_Access();
        $accessToken->setToken($config['token']);
        $accessToken->setTokenSecret($config['secret']);
        $config = core::config('oauth')->get('google');

        $oauthOptions = array(
          'requestScheme' => Zend_Oauth::REQUEST_SCHEME_HEADER,
          'version' => '1.0',
          'consumerKey' => $config['key'],
          'consumerSecret' => $config['secret'],
          'signatureMethod' => 'RSA-SHA1', 
          'callbackUrl' => 'http://t.pagodabox.com/',
          'requestTokenUrl' => 'https://www.google.com/accounts/OAuthGetRequestToken',
          'userAuthorizationUrl' => 'https://www.google.com/accounts/OAuthAuthorizeToken',
          'accessTokenUrl' => 'https://www.google.com/accounts/OAuthGetAccessToken'
        );

        $httpClient = $accessToken->getHttpClient($oauthOptions);
        $client = new Zend_Gdata_Docs($httpClient, "t.pagodabox.com");

        // Retrieve user's list of Google Docs
        $feed = $client->getDocumentListFeed();
        foreach ($feed->entries as $entry) 
        {
          echo "$entry->title\n";
        }
    }


    public function action_next()
    {
        $singleUseToken = $_GET['token'];
        $sessionToken = Zend_Gdata_AuthSub::getAuthSubSessionToken($singleUseToken);

        // Create a Calendar service object and set the session token for subsequent requests
        $calendarService = new Zend_Gdata_Calendar(null, 'google-ExampleApp-v1.0');
        $calendarService->setAuthSubToken($sessionToken);
        die;
        $client = new Zend_Gdata_HttpClient();
        $client->setAuthSubPrivateKeyFile(core::$cache_dir.'/google_rsakey.pem', null, true);
        $sessionToken = Zend_Gdata_AuthSub::getAuthSubSessionToken($singleUseToken, $client);

        $calendarService = new Zend_Gdata_Calendar($client, 'google-ExampleApp-v1.0');
        $calendarService->setAuthSubToken($sessionToken);
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

    public function action_tokeninfo()
    {
        echo Zend_Gdata_AuthSub::getAuthSubTokenInfo($_SESSION['cal_token']);
    }
}// End Welcome
