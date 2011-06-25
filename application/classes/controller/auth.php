<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller_Base {
    const COOKIE_NAME = 'chemila';
    const SESSION_NAME = 'source';

    public function action_index()
    {
        $this->init_view();
    }

    public function action_authsub()
    {
        $config = Core::config('google')->get('authsub');
        $session_token = Arr::get($config, 'session', false);
         
        //if ( ! $_SESSION['cal_token'])
        if ( ! $session_token)
        {
            if (isset($_GET['token'])) 
            {
                // You can convert the single-use token to a session token.
                $session_token = Zend_Gdata_AuthSub::getAuthSubSessionToken($_GET['token']);
                // Store the session token in our session.

            } 
            else 
            {
                $googleUri = Zend_Gdata_AuthSub::getAuthSubTokenUri($config['next'], $config['scope'], false, true);
                // Display link to generate single-use token
                //echo "Click <a href='$googleUri'>here</a> " .  "to authorize this application.";
                $this->request->redirect($googleUri);
            }
        }

        $this->request->redirect('/');
    }

    public function action_login()
    {
        $src = Arr::get($_GET, 'source', false);
        if( ! $src)
        {
            $this->trigger_error('source is invalid');
        }

        session::instance()->set(self::SESSION_NAME, $src);
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

        $this->init_view('success');
        $this->view->user_info = $user_info;
        return;

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
        if($src = session::instance()->get_once(self::SESSION_NAME, false))
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
        $config = Core::config('google')->get('authsub');
        return Zend_Gdata_AuthSub::getAuthSubTokenUri($config['next'], $config['scope'], false, true);
    } 
}
