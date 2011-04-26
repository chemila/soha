<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Attention extends Controller_Authenticated
{
	public function action_index()
	{
		$model_attention = new Model_Attention();
		
		$data = array(
					"uid"=>$this->user->uid
				);
		
		$attention_count = $model_attention->attention_count($data);
				
		$attention = $model_attention->get_attention_list($data);
		
		$view = new View_Smarty('smarty:attention/index');

		$view->user_info = $this->public_user_info();
		$view->attention_count = $attention_count;
        $view->attentions = $attention;

        $this->request->response = $view->render();
	}
	
	public function action_add()
	{
		$model_attention = new Model_Attention();
		
		$data = array(
					"uid"=>$this->user->uid,
					"fuids"=>$_GET['fuids']
				);
				
		return $model_attention->add_attention($data);
	}
	
	public function action_delete()
	{
		$model_attention = new Model_Attention();
		
		$fuids = $this->request->param("id");
		
		if(empty($fuids))
		{
			$this->request->redirect('/attention');
		}
		
		$data = array(
					"uid"=>$this->user->uid,
					"fuids"=>$fuids
				);
				
		$response = $model_attention->delete_attention($data);
		
		if($response)
		{
			$this->request->redirect('/attention');
		}
		else 
		{
			$this->request->redirect('/error/attention');
		}
	}
	
	public function action_collect()
	{
		$model_attention = new Model_Attention();
		
		$data = array(
					"uid"=>3
				);
				
		$response = $model_attention->attention_count($data);
		
		if( !$response )
		{
			echo "0";
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
    
    
    public function action_fans()
    {
    	$model_attention = new Model_Attention();
		
		$data = array(
					"uid"=>$this->user->uid
				);
		
		$attention_count = $model_attention->attention_count($data);
				
		$attention = $model_attention->get_fans($data);
		
		$view = new View_Smarty('smarty:attention/fans');

		$view->user_info = $this->public_user_info();
		$view->attention_count = $attention_count;
        $view->attentions = $attention;

        $this->request->response = $view->render();
    }
    
	public function action_delfans()
	{
		$model_attention = new Model_Attention();
		
		$fuids = $this->request->param("id");
		
		if(empty($fuids))
		{
			$this->request->redirect('/attention/fans');
		}
		
		$data = array(
					"uid"=>$this->user->uid,
					"fuids"=>$fuids
				);
				
		$response = $model_attention->delete_fans($data);
		
		if($response)
		{
			$this->request->redirect('/attention/fans');
		}
		else 
		{
			$this->request->redirect('/error/attention');
		}
	}
}