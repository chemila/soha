<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller_Base {
    const COOKIE_NAME = 'chemila';

    public function action_index()
    {
        $this->request->redirect('error/404');
        $this->init_view();
    }

    public function action_authsub()
    {
        var_dump($_GET);die;    
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
}
