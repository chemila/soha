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
		
		$friends_count = $model_friend->get_fiend_count($data);
		
		$view = new View_Smarty('smarty:friend/index');
		
		$view->user_info = $this->public_user_info();

        $view->friends = $friends;
        $view->friends_count = $friends_count;

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
		$fuids = $this->request->param("id");
		
		if(empty($fuids))
		{
			$this->request->redirect('/friend');
		}
		
		$data = array(
			"uid"=>$this->user->uid,
			"fuids"=>$fuids
		);
				
		$model_friend = new Model_Friend();
		
		$response = $model_friend->delete_friend($data);
		
		if($response)
		{
			$this->request->redirect('/friend');
		}
		else 
		{
			$this->request->redirect('/error/friend');
		}
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
	
    public function public_user_info()
    {
    	$user_info = Model_API::factory('user')->get_user_info(array("uid"=>$this->user->uid));
		
		return $user_info;
    }
}
