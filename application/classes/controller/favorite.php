<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Favorite extends Controller_Authenticated {
	
    public function action_add()
    {
    	$id = $this->request->param("id");
    	
    	$model_favorite = new Model_Favorite($this->user);
    	
        $model_favorite->add_favorite($id);
    }
    
	public function action_delete()
    {
    	$id = $this->request->param("id");
    	
    	if(empty($id))
    	{
    		$this->request->redirect("/favorite");
    	}
    	
    	$model_favorite = Model::factory("favorite");
    	
        $reponse = $model_favorite->del_favorite($id);
        
        if( $reponse )
        {
        	$this->request->redirect("/favorite");
        }
        else 
        {
        	
        }
    }

    public function action_index()
    {
    	// Init view cache modules etc.
        $this->view = new View_Smarty('smarty:favorite/index');
        
        $model_favorite = Model::factory("favorite");
        
        $my_favorite_weibo_row = $model_favorite->list_favorite($this->user->uid);
        
        $user_info = $this->public_user_info();
        	
        $this->view->user_info = $user_info;

        $this->view->list_my_favorites = $my_favorite_weibo_row;
        
        $this->request->response = $this->view->render();
    }
    
    public function public_user_info()
    {
    	$user_info = Model_API::factory('user')->get_user_info(array("uid"=>$this->user->uid));
		
		return $user_info;
    }
}
