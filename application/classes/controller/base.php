<?php defined('SYSPATH') or die('No direct script access.');

abstract class Controller_Base extends Controller {

    public function before()
    {
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
        $this->request->redirect('error/forbidden');
    }

    protected function init_view($action = NULL, $controller = NULL)
    {
        $this->view = new View_Smarty('smarty:'.strtr(':controller/:action', array(
            ':controller' => empty($controller) ? $this->request->controller : $controller,
            ':action'     => empty($action) ? $this->request->action : $action,
        )));

		if($user = $this->get_current_user())
		{
			$this->view->current_user = $user->as_array();
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

    protected function trigger_error($error_path = 'default', $type = '404')
    {
        $message = Core::message('error', $error_path, false);

        if(Request::$is_ajax)
        {
            $this->response_json('CC2510', $message);
        }
    
        if($message)
        {
            Session::instance()->set('error', $message);
        }

        $this->request->redirect('error/'.$type);
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

    protected function get_current_user()
    {
        if(isset($this->user))
            return $this->user;

        $su = Cookie::get(Controller_Auth::COOKIE_NAME, false);

        if( ! $su or ! preg_match('~sid=(\w+);uid=(\d+)$~', $su, $match))
            return false;

        list(, $sid, $uid) = $match;
        $user = new Model_User($uid);

        return $sid === $user->session->sid ? $user : false;
    }
}
