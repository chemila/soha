<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Message extends Controller_Authenticated
{
	public function action_index()
	{
		$model_message = new Model_Message();
		
		$data = array("uid" => $this->user->uid);
		$messages = $model_message->get_all_received_list($data);
		$view = new View_Smarty("smarty:message/index");
		$view->messages = $messages;

        $this->request->response = $view->render();
	}
	
	public function action_send()
	{
		$model_message = new Model_Message();
		
		$data = array(
						"uid"=>$this->user->uid,
						"fuids"=>$_POST['fuid'],
						"content"=>$_POST['content']
					);
		
		return $model_message->send($data);
	}
	
	public function action_delete()
	{
		$model_message = new Model_Message();
		
		$data = array(
					"uid"=>$this->user->uid,
					"msg_id"=>$_POST['msg_id']
				);
				
		return $model_message->delete($data);
	}
	
	public function action_msginfo($msg_id)
	{
		$model_message = new Model_Message();
		
		$data = array(
				"uid" => $this->user->uid,
				"msg_id"=>$_POST['msg_id']
				);
				
		$msg_info = $model_message->get_msginfo($data);
		
		$view = new View_Smarty("smarty:message/index");
		
		$view->messages = $msg_info;

        $this->request->response = $view->render();
	}
	
	public function action_collect()
	{
		$model_message = new Model_Message();
		
		$data = array(
					"uid"=>$this->user->uid
				);
				
		$response = $model_message->get_collect($data);
		
		if( !$response )
		{
			echo "0";
		}
		else 
		{
			echo "revcount: ".$response['revcount']."  sended:".$response['sendcount'];
		}
	}
}
