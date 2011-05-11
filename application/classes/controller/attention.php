<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Attention extends Controller_Authenticated
{
	public function action_index()
	{
		$this->view = new View_Smarty('smarty:attention/index');
		$page = Arr::get($_GET, "page", 1);
        $uid = Arr::get($_GET, 'uid', $this->user->pk());
				
		$model_attention = new Model_Attention();
        $this->init_user($uid);
		
        $this->view->attentions = $model_attention->get_attention_list($uid, $page);
        $this->view->count = $model_attention->attention_count($uid);

        $this->request->response = $this->view->render();
	}
	
	public function action_add()
	{
		$model_attention = new Model_Attention();
		$fuid = Arr::get($_POST, 'uid');
		if(empty($fuid))
		{
			die(json_encode(array('code' => 'CC2510')));
		}
		
		$data = array(
					"uid"=>$this->user->uid,
					"fuids"=>$fuid
				);
				
		//return $model_attention->add_attention($data);
		$result = $model_attention->add_attention($data);

        if( ! $result)
        {
            die(json_encode(array('code' => 'CC2510')));
        }

        $json = array(
            'code' => 'A00006',
            'data' => array(),
        );

        die(json_encode($json));
	}
	
	public function action_delete()
	{
		$model_attention = new Model_Attention();
		
		$fuids = Arr::get($_POST, "touid", '');
		
		if(empty($fuids))
		{
			die(json_encode(array("code"=>"CF0406")));
		}
		
		/*
		 * 删除 粉丝
		 */
		$action = Arr::get($_POST, "action", '');
		if($action == 1)
		{
			$isblack = Arr::get($_POST, "isblack", '');
			$model_user_api = Model_API::factory("user");
			$model_user_api->add_block(array("uid"=>$this->user->uid, "fuids"=>$fuids));
			$data = array(
				"uid"=>$this->user->uid,
				"fuids"=>$fuids
			);
				
			$response = $model_attention->delete_fans($data);
		}
		else 
		{
			$data = array(
				"uid"=>$this->user->uid,
				"fuids"=>$fuids
			);
			
			$response = $model_attention->delete_attention($data);
		}
		
		if($response)
		{
			die(json_encode(array("code"=>"A00006")));
		}
		else 
		{
			die(json_encode(array("code"=>"CF0406")));
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
	
    public function action_fans()
    {		
        $this->view = new View_Smarty('smarty:attention/fans');
		$page = Arr::get($_GET, "page", 1);
        $uid = Arr::get($_GET, 'uid', $this->user->pk());
				
		$model_attention = new Model_Attention();
        $this->init_user($uid);
		
        $this->view->attentions = $model_attention->get_fans($uid, $page);
        $this->view->count = $model_attention->fans_count($uid);

        $this->request->response = $this->view->render();
    }    

    protected function init_user($uid = NULL)
    {
        if($uid == $this->user->pk())
        {
            $user = $this->user;
            $this->view->show_delete = true;
        }
        else
        {
            $user = new Model_User($uid);
            $this->view->show_delete = false;
        }

        $user->load();

        $this->view->user_info = $user->as_array();
    }
}
