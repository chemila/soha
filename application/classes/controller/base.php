<?php defined('SYSPATH') or die('No direct script access.');

abstract class Controller_Base extends Controller {
    protected $_is_login = FALSE;

    public function before()
    {
        $su = Cookie::get(Controller_Auth::COOKIE_NAME, FALSE);

        if($su and preg_match('~sid=(\w+);uid=(\d+)~', $su))
        {
            $this->_is_login = TRUE;
        }

        return parent::before();
    }

    public function after()
    {
        if(isset($this->view))
        {
            $this->request->response = $this->view->render();
        }

        return parent::after();
    }

    public function is_observer($uid)
    {
        $observers = Core::config('admin')->as_array();

        return Arr::search($observers, $uid);
    }

    public function action_forbidden()
    {
        $this->request->redirect('/');
    }

    protected function init_view($action = NULL, $controller = NULL)
    {
        $this->view = new View_Smarty('smarty:'.strtr(':controller/:action', array(
            ':controller' => empty($controller) ? $this->request->controller : $controller,
            ':action'     => empty($action) ? $this->request->action : $action,
        )));

        $this->view->is_login = $this->_is_login;

		if($user = $this->get_current_user())
		{
			$this->view->current_user = $user->pk();
		}
    }

    protected function init_cache(Model_User $user)
    {
        $this->_following_cache = new Model_Cache_Following($user);
        $this->_friend_cache = new Model_Cache_Friend($user);
		$this->_unread_cache = new Model_Cache_Unread($user);

        $this->_following_cache->init($user->get_following_ids());
        $this->_friend_cache->init($user->get_fans_ids());
		$this->_unread_cache->init($user->get_unread_status());
    }

    protected function unset_cache(Model_User $user)
    {    
   		Model_Cache::cleanup($user);	
		unset($this->_following_cache, $this->_friend_cache, $this->_unread_cache);
    }

    protected function get_page($name = 'page')
    {
    	$page = $this->request->param($name, Arr::get($_GET, $name, 1));
        return max($page, 1);
    }

    protected function trigger_error($message = NULL, Array $errors = Array(), $type = '404')
    {
        if(Request::$is_ajax)
        {
            $this->response_json('CC2510', $errors);
        }

        $this->init_view($type, 'error');

        $this->view->errors = $errors;
        $this->view->message = $message;
        $this->view->title = '错误提示';

        $this->request->action = 'force_exit';
    }

    protected function response_json($code = 'A00006', $data = NULL, $callback = NULL)
    {
        $json = array(
            'code' => $code,       
        );

        if( ! empty($data))
        {
            $json['data'] = $data;
        }

        if( ! $callback)
        {
            $response = json_encode($json);
        }
        else
        {
            $response = sprintf("try{%s(%s);}catch(e){throw e}", $callback, json_encode($json)); 
        }

        die($response);
    }

    public function action_force_exit(){}

    protected function init_user(Model_User $user)
    {
        if( ! isset($this->view))
        {
            $this->init_view();
        }

        $this->view->user = $user->as_array();
        $this->view->followers = $user->list_following(Model_User::CATEGORY_STAR, 1, 9);
        $this->view->general_followers = $user->list_following(Model_User::CATEGORY_DEFAULT, 1, 9);
        $this->view->friends = $user->friends_list();
        $this->view->followers_of_friends = $user->followers_of_friends();
    }

    protected function get_current_user()
    {
        if(isset($this->user))
            return $this->user;

        $su = Cookie::get(Controller_Auth::COOKIE_NAME, false);
        if( ! $su)
            return false;

        if( ! preg_match('~sid=(\w+);uid=(\d+)$~', $su, $match))
            return false;

        $sid = $match[1];
        $uid = $match[2];

        $session = new Model_Session($uid);
        if($sid != $session->sid)
            return false;

        $this->_is_login = true;
        return $this->user = new Model_User($uid);
    }
}
