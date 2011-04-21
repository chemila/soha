<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Friend extends Controller_Authenticated
{
	public function action_index()
	{
		$data = array(
					"uid"=>$this->user->uid
				);
		
		$model_friend = new Model_Friend();
		$friends = $model_friend->get_friend_list($data);
		
		$view = new View_Smarty('smarty:friend/index');

        $view->friends = $friends;

        $this->request->response = $view->render();
	}
	
	public function action_add()
	{
		$data = array(
			"uid"=>$this->user->uid,
			"fuids"=>$_GET['fuids']
		);
				
		$model_friend = new Model_Friend();
		
		$model_friend->add_friend($data);
	}
	
	public function action_delete()
	{
		$data = array(
			"uid"=>$this->user->uid,
			"fuids"=>$_GET['fuids']
		);
				
		$model_friend = new Model_Friend();
		
		$model_friend->delete_friend($data);
	}
	
	public function action_collect()
	{
		$data = array(
			"uid"=> $this->user->uid
		);
		
		$model_friend = new Model_Friend();
		
		$response = $model_friend->get_fiend_count($data);
		
		if( !$response )
		{
			echo 0;
		}
		else 
		{
			echo $response[0];
		}
	}
}
