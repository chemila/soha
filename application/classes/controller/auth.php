<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller {

    public function action_index()
    {
        $this->request->response = view::factory('auth/login');
    }

    public function action_login()
    {
        $src = $this->request->param('source', 'sina');

        if(empty($src))
        {
            $this->request->redirect('/error/oauth');
        }

        $oauth = new OAuth($src);

        if( ! session::instance()->set('oauth_src', $src))
        {
            $this->request->redirect('/error/oauth');
        }

        if($callback = $oauth->request_token())
        {
            $this->request->redirect($callback);
        }
        else
        {
            $this->request->redirect('/error/oauth');
        }
    }

    public function action_oauth_callback()
    {
        $verifier = Arr::get($_GET, 'oauth_verifier', $_GET['oauth_token']);
        $session = session::instance();
        $src = $session->get('oauth_src', false); 

        if(empty($src))
        {
            $this->request->redirect('/error/404');
        }

        $oauth = new OAuth($src);
        $access_token = $oauth->access_token($verifier);

        if( ! $oauth->has_access_token())
        {
            $this->request->redirect('/error/oauth');
        }

        // Fetch userinfo accoss oauth
        $model_oauth = Model_OAuth::factory($oauth);
        $user_info = $model_oauth->user_info();

        $user = new Model_User;

        if( ! $user->check_exist($user_info['suid'], $user_info['source']))
        {
            if($user->create($user_info))
            {
                $user->save_token($access_token->token, $access_token->secret);
            }
            else
            {
                $this->request->redirect('/error/user');
            }
        }

        $session->set('uid', $user->uid);
        $session_model = new Model_Session;
        $session_model->create_or_write($session->id(), array(
            'uid' => $user->uid,
        ));

        $this->request->redirect('/home');
    }
}
