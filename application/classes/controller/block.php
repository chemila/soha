<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Block extends Controller_Authenticated {

    public function action_index()
    {
        $model_block = new Model_Block();

        $data = array(
        		"uid"=>$this->user->uid
        );
        
       
        
        $blocks = $model_block->all_block_by_user($data);

        $view = new View_Smarty('smarty:block/index');
        $view->block_count = $model_block->count_block($data);
        $view->user_info = $this->public_user_info();

        $view->blocks = $blocks;

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
	    
	    	$data = array("uid"=>$this->user->uid,
	    				  "fuids"=>$_POST['fuids'],
	    				  "reason"=>$_POST['reason']
	    				);
	    	
	        $result = $model_block->add_block($data);
	        
	        if($result)
	        {
	        	/* 添加成功*/
	        }
	        else 
	        {
	        	/* 添加失败 */
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
    	$fuids = $this->request->param("id");
    	if(empty($fuids))
    	{
    		$this->request->redirect('/block');
    	}
    	
    	$model_block = new Model_Block();
    	$data = array(
    				"uid" =>$this->user->uid,
    				"fuids" =>$fuids
    	);
    		
    	$model_block->delete_block($data);
 
    	$this->request->redirect('/block');
    }
    
    public function public_user_info()
    {
    	$user_info = Model_API::factory('user')->get_user_info(array("uid"=>$this->user->uid));
		
		return $user_info;
    }
}

