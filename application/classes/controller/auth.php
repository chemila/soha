<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller {

    public function action_index()
    {
        $this->request->response = view::factory('oauth');
    }

    public function action_login()
    {
        $src = $_GET['src'];

        if(empty($src))
        {
            $this->request->redirect('/index.php/error/oauth');
        }

        $oauth = new OAuth($src);

        if( ! session::instance()->set('oauth_src', $src))
        {
            $this->request->redirect('/index.php/error/oauth');
        }

        if($callback = $oauth->request_token())
        {
            $this->request->redirect($callback);
        }
        else
        {
            $this->request->redirect('error/oauth');
        }
    }

    public function action_oauth_callback()
    {
        $verifier = Arr::get($_GET, 'oauth_verifier', $_GET['oauth_token']);
        $src = session::instance()->get('oauth_src', false); 

        if(empty($src))
        {
            $this->request->redirect('error/404');
        }

        $oauth = new OAuth($src);
        $access_token = $oauth->access_token($verifier);

        if($oauth->has_access_token())
        {
            // Fetch userinfo accoss oauth
            $model_oauth = Model_OAuth::factory($oauth);
            $user_info = $model_oauth->user_info();

            // Create user, save user access_token
            $user = new Model_User;

            if($result = $user->create($user_info))
            {
                $user->save_token($access_token->token, $access_token->secret);
                cookie::set('uid', (string)$user);
            }
            else
            {
                var_dump($user_info);die;
            }
            
            $this->request->redirect('public/index');
        }
        else
        {
            $this->request->redirect('error/oauth');
        }
    }
}
