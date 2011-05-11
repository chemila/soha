<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Block extends Controller_Authenticated {

    public function action_index()
    {
    	$page = $this->request->param("page", Arr::get($_GET, "page", 1));
    	
        $model_block = new Model_Block();

        $data = array(
        		"uid"=>$this->user->uid,
        		"page"=>$page,
        );
        
        $blocks = $model_block->all_block_by_user($data);

        $view = new View_Smarty('smarty:block/index');
        $view->block_count = $model_block->count_block($data);
        $view->user_info = $this->public_user_info();

        $view->blocks = $blocks;
        
        $view->count = $view->block_count;

        $this->request->response = $view->render();
    }

    public function action_add()
    {
    	/*
    	 * 添加黑名单
    	 */
    	$view = new View_Smarty('smarty:block/add');
    	if( $_POST )
    	{
	    	$model_block = new Model_Block;
	    
	    	$data = array(
	    			"uid"=>$this->user->uid,
	    			"fuids"=>$_POST['fuids'],
	    			"reason"=>$_POST['reason']
	    	);
	    	
	        $result = $model_block->add_block($data);
	        
	        if($result)
	        {
	        	die(json_encode(array("code"=>"A00006")));
	        }
	        else 
	        {
	        	die(json_encode(array("code"=>"E00001")));
	        }
    	}
    	/*
    	 * 列好友
    	 */
    	else
    	{
    		$model_block = new Model_Block();
    		$data = array(
    				"uid" =>$this->user->uid
    		);
    					
    		$friends = $model_block->get_all_friend($data);
    		
        	$view->friends = $friends;
    	}
    	
    	$this->request->response = $view->render();
    }

    public function action_delete()
    {
    	$fuids = Arr::get($_POST, "touid", '');
    	if(empty($fuids))
    	{
    		die(json_encode(array("code"=>"E00002")));
    	}
    	
    	$model_block = new Model_Block();
    	$data = array(
    				"uid" =>$this->user->uid,
    				"fuids" =>$fuids
    	);
    		
    	$model_block->delete_block($data);
 
    	die(json_encode(array("code"=>"A00006")));
    }
    
    public function public_user_info()
    {
    	$user_info = Model_API::factory('user')->get_user_info(array("uid"=>$this->user->uid));
		
		return $user_info;
    }
}

