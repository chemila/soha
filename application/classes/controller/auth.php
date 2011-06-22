<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller_Base {
    const COOKIE_NAME = 'chemila';

    public function action_index()
    {
        $this->trigger_error();
    }

    public function action_authsub_security()
    {
        $singleUseToken = Arr::get($_GET, 'token', false);

        if( ! $singleUseToken)
        {
            $this->trigger_error('404');
        }

        $client = new Zend_Gdata_HttpClient();
        $client->setAuthSubPrivateKeyFile(Core::$cache_dir.'/authsub.pem', null, true);
        $sessionToken = Zend_Gdata_AuthSub::getAuthSubSessionToken($singleUseToken, $client);

        $calendarService = new Zend_Gdata_Calendar($client);
        $calendarService->setAuthSubToken($sessionToken);

        var_dump($sessionToken);die;
    }

    public function action_authsub()
    {
        $googleUri = $this->getAuthSubUrl();
        //$session_token = Core::config('google')->get('authsub_session', false);
         
        if ( ! $_SESSION['cal_token'])
        {
            if (isset($_GET['token'])) 
            {
                // You can convert the single-use token to a session token.
                $session_token = Zend_Gdata_AuthSub::getAuthSubSessionToken($_GET['token']);
                // Store the session token in our session.
                $_SESSION['cal_token'] = $session_token;
                die($session_token);
            } 
            else 
            {
                // Display link to generate single-use token
                echo "Click <a href='$googleUri'>here</a> " .  "to authorize this application.";
                exit();
            }
        }
         
        // Create an authenticated HTTP Client to talk to Google.
        $client = Zend_Gdata_AuthSub::getHttpClient($session_token);
         
        // Create a Gdata object using the authenticated Http Client
        $service = new Zend_Gdata_Calendar($client);
        // Create a new entry using the calendar service's magic factory method
        $event= $service->newEventEntry();
         
        // Populate the event with the desired information
        // Note that each attribute is crated as an instance of a matching class
        $event->title = $service->newTitle("My Event");
        $event->where = array($service->newWhere("Mountain View, California"));
        $event->content = $service->newContent(" This is my awesome event. RSVP required.");
         
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

    public function action_login()
    {
        $src = $this->request->param('source', 'sina');
        if(empty($src))
        {
            $this->trigger_error('缺少认证平台来源');
        }

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
    
    public function action_logout()
    {
    	Cookie::delete(self::COOKIE_NAME);
        Session::instance()->destroy();

        if($this->user)
        {
            $this->unset_cache($this->user);
            //TODO: online checking
			//$this->user->online = 0;
			//$this->user->save();
            $this->user = NULL;
        }

    	$this->request->redirect('/');
    }

    public function action_oauth_callback()
    {
        $verifier = Arr::get($_GET, 'oauth_verifier', $_GET['oauth_token']);
        $src = $this->get_referer_source();

        if( ! $src)
        {
            $this->trigger_error('获取认证来源出错');
        }

        $oauth = new OAuth($src);
        $access_token = $oauth->access_token($verifier);

        if( ! $oauth->has_access_token())
        {
            $this->trigger_error('获取access token失败');
        }
        // Fetch userinfo accoss oauth
        $model_oauth = Model_OAuth::factory($oauth);
        $user_info = $model_oauth->user_info();

        if( ! $user_info)
        {
            $this->trigger_error('获取用户信息失败');
        }

        $user = new Model_User;
        $choose = false;

        if( ! $uid = $user->check_exist($user_info['suid'], $user_info['source']))
        {
            if( ! $uid = $user->create($user_info))
            {
                $this->trigger_error('创建用户失败');
            }

            $choose = true;
        }

        if( ! $user->save_token($access_token))
        {
            $this->trigger_error('用户token存储失败');
        }

        if($sid = $user->save_session())
        {
            Cookie::set(self::COOKIE_NAME, sprintf('sid=%s;uid=%s', $sid, $uid), 1296000);
        }
        else
        {
            $this->trigger_error('用户session存储失败');
        }

        if($choose)
        {
            $this->init_view('choose');
            $this->view->user = $user_info;
        }
        else
        {
            $this->request->redirect('/');
        }
    }

    public function action_oauth_google()
    {
        $verifier = Arr::get($_GET, 'oauth_verifier', $_GET['oauth_token']);
        $src = $this->get_referer_source();

        if( ! $src)
        {
            $this->trigger_error('获取认证来源出错');
        }

        $oauth = new OAuth($src);
        $access_token = $oauth->access_token($verifier);

        if( ! $oauth->has_access_token())
        {
            $this->trigger_error('获取access token失败');
        }
        
        var_dump($access_token);
        die('success');
    }

    protected function get_referer_source()
    {
        //HTTP_REFERER
        if($src = session::instance()->get_once('oauth_src', false))
            return $src;

        $referer = @$_SERVER['HTTP_REFERER'];

        if(empty($referer))
            return false;

        if(false !== strpos($referer, 'api.t.163.com'))
            return '163';

        if(false !== strpos($referer, 'api.t.sohu.com'))
            return 'sohu';

        if(false !== strpos($referer, 'open.t.qq.com'))
            return 'qq';

        if(false !== strpos($referer, 'sina.com.cn'))
            return 'sina';
            
        return false;
    }

    protected function getAuthSubUrl() 
    {
      $next = 'http://t.pagodabox.com/auth/authsub';
      $scope = 'https://www.google.com/calendar/feeds/';
      $secure = false;
      $session = true;
      return Zend_Gdata_AuthSub::getAuthSubTokenUri($next, $scope, $secure, $session);
    } 
}
