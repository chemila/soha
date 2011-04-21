<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Attention extends Controller_Authenticated
{
	public function action_index()
	{
		$model_attention = new Model_Attention();
		
		$data = array(
					"uid"=>$this->user->uid
				);
				
		$attention = $model_attention->get_attention_list($data);
		
		$view = new View_Smarty('smarty:attention/index');

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
		
		$data = array(
					"uid"=>$this->user->uid,
					"fuids"=>$_GET['fuids']
				);
				
		return $model_attention->delete_attention($data);
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
}