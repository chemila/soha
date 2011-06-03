<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Message extends Controller_Authenticated {
	public function action_index()
	{
		$page = $this->get_page();

		$messages_count = $this->user->count_message();
		$messages = $this->user->list_message($page);

		$this->init_view();
        $this->init_user($this->user);
        $this->_unread_cache->clear('msg');

		$this->view->messages = $messages;
		$this->view->messages_count = $messages_count['revcount'];
		$this->view->count = $messages_count['revcount'];
	}
	
	public function action_delete()
	{
		$msg_id = Arr::get($_POST, "id", FALSE);
		
		if(empty($msg_id))
		{
			$this->response_json("E00002");
		}
		
		$this->user->rm_message($msg_id);
		//$this->request->redirect('/message');
        $this->response_json();
	}
}
