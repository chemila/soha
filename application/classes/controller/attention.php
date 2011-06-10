<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Attention extends Controller_Authenticated
{
	public function action_index()
	{
		$page = Arr::get($_GET, "page", 1);
        $uid = Arr::get($_GET, 'fuid', false);
        
        $user = $uid ? new Model_User($uid) : $this->user;
				
		$this->init_view();
        $this->init_user($user);
        
	    if( !empty($uid)  && $uid != $this->user->uid )
        {
        	$this->view->show_delete = 0;
        }
        else 
        {
        	$this->view->show_delete = 1;
        }
        
        $this->view->attentions = $user->list_following(Model_User::CATEGORY_ALL, $page);
        $this->view->count = $user->count_following(Model_User::CATEGORY_ALL);
	}
	
    public function action_fans()
    {
        $page = $this->get_page();
        $uid = Arr::get($_GET, 'fuid', false);
		
        $this->init_view();
		$user = empty($uid) ? $this->user : new Model_User($uid);
		$this->init_user($user);

        $this->_unread_cache->clear('attention');
		
        $this->view->is_self = $user->pk() == $this->get_current_user('uid');
        $this->view->attentions = $user->list_fans($page);
        $this->view->count = $user->count_fans();
    }
}
