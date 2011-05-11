<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Message extends Controller_Authenticated
{
	public function action_index()
	{
		$page = Arr::get($_GET, "page", 1);
		
		$model_message = Model::factory("message");
		
		$data = array(
			"uid" => $this->user->uid,
			"page" => $page
		);
		
		$messages_count = $model_message->get_collect($data);
		
		$messages = $model_message->get_all_received_list($data);

		$view = new View_Smarty("smarty:message/index");
		$view->messages = $messages;
		
		$view->messages_count = $messages_count;
		
		$view->count = $messages_count['revcount'];
		
		$view->user_info = $this->public_user_info();

        $this->request->response = $view->render();
	}
	
	public function action_add()
	{
		$model_message = new Model_Message();
		
		$fuid = Arr::get($_POST, "fuid");
		
		/*
		 * 传递的是 nick 获取 uid
		 */
		if(!is_numeric($fuid))
		{
			$nick = Arr::get($_POST, "nick");
			$fuid_arr = $model_message->get_uid(array("nick"=>$nick)) ;
			$fuid = Arr::get($fuid_arr, "uid");
		}
		
		$content = Arr::get($_POST, "content");
		
		if(empty($fuid) || empty($content))
		{
			$this->request->redirect('/message');
		}
		
		$data = array(
				"uid"=>$this->user->uid,
				"fuids"=>$fuid,
				"content"=>$content
		);
		
		$response = $model_message->send($data);
		
		if($response)
		{
			$this->request->redirect("/message");
		}
		else 
		{
			$this->request->redirect("/message");
		}
	}
	
	public function action_delete()
	{
		$model_message = new Model_Message();
		
		$msg_id = Arr::get($_POST, "uid", '');
		$isblack = Arr::get($_POST, "isblack", '');
		
		if(empty($msg_id))
		{
			die(json_encode(array("code"=>"E00002")));
		}
		
		/*
		 * 勾选了把此人 写入 黑名单
		 */
		if($isblack == "OK")
		{
			$me_data = array("uid"=>$this->user->uid, "msg_id"=>$msg_id);
			$model_message_api = Model_API::factory("message");
			$relation_arr = $model_message_api->get_relation_to_fuid($me_data);
			$fuid = $relation_arr[0]['uid'];
			
			$model_user_api = Model_API::factory("user");
			$model_user_api->add_block(array("uid"=>$this->user->uid, "fuids"=>$fuid));
		}
					
		$data = array(
				"uid"=>$this->user->uid,
				"msg_id"=>$msg_id
		);
				
		$response = $model_message->del($data);
		if($response)
		{
			die(json_encode(array("code"=>"A00006")));
		}
		else 
		{
			die(json_encode(array("code"=>"CC2702")));
		}
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
	
    public function public_user_info()
    {
    	$user_info = Model_API::factory('user')->get_user_info(array("uid"=>$this->user->uid));
		
		return $user_info;
    }
    
    public function action_suc()
    {
    	$view = new View_Smarty("smarty:message/success");

        $this->request->response = $view->render();
    }
}
