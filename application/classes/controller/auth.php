<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller_Base {
    const COOKIE_NAME = 'su';
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
            $this->trigger_error('auth.source');
        }

        session::instance()->set(self::SESSION_NAME, $src);
        $oauth = new OAuth($src);

        if($callback = $oauth->request_token())
        {
            $this->request->redirect($callback);
        }
        else
        {
            $this->trigger_error('oauth.request_token');
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
        $src = session::instance()->get_once(self::SESSION_NAME, false);

        if( ! $src)
        {
            $this->trigger_error('auth.source');
        }

        $oauth = new OAuth($src);
        $access_token = $oauth->access_token($verifier);

        if( ! $oauth->has_access_token())
        {
            $this->trigger_error('oauth.access_token');
        }
        // Fetch userinfo accoss oauth
        $model_oauth = Model_OAuth::factory($oauth);
        $user_info = $model_oauth->user_info();

        if( ! $user_info)
        {
            $this->trigger_error('oauth.user_info');
        }

        $user = new Model_User(array('suid' => $user_info['suid'], 'source' => $user_info['source']));

        if( ! $user->loaded())
        {
            $user->values($user_info);
            $user->save();

            if( ! $user->saved())
            {
                $this->trigger_error('user.create');
            }
        }

        $token = $user->token->reload();
        if( ! $token->loaded())
        {
            $token->uid = $user->pk();
        }
        $token->values($access_token->as_array())->save();
        if( ! $token->saved())
        {
            $this->trigger_error('token.create');
        }

        $session = $user->session->reload();
        if( ! $session->loaded())
        {
            $session->uid = $user->pk();
        }
        $session->sid = Session::instance()->id();
        $session->save();
        if($user->session->saved())
        {
            Cookie::set(self::COOKIE_NAME, sprintf('sid=%s;uid=%s', $session->sid, $user->pk()));
        }
        else
        {
            $this->trigger_error('session.create');
        }

        $this->request->redirect('user/index');
    }

    public function action_oauth_google()
    {
        $verifier = Arr::get($_GET, 'oauth_verifier', $_GET['oauth_token']);
        $src = $this->get_referer_source();

        if( ! $src)
        {
            $this->trigger_error('auth.source');
        }

        $oauth = new OAuth($src);
        $access_token = $oauth->access_token($verifier);

        if( ! $oauth->has_access_token())
        {
            $this->trigger_error('oauth.access_token');
        }
        die('success');
    }
}
