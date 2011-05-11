<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Favorite extends Controller_Authenticated {
	
    public function action_add()
    {
    	$id = $this->request->param("mid", Arr::get($_REQUEST, 'mid'));
    	
    	$model_favorite = Model::factory("favorite");
    	
        $model_favorite->add_favorite(array("wid"=>$id, "uid"=>$this->user->uid));
        
        $this->request->response = json_encode(array("code"=>"M10001"));
    }
    
	public function action_delete()
    {
    	$id = Arr::get($_POST, "mid", "");
    	
    	if(empty($id))
    	{
    		$this->request->response = json_encode(array("code"=>"R40001"));
    	}
    	
    	$model_favorite = Model::factory("favorite");
    	
        $reponse = $model_favorite->del_favorite($id);
        
        if( $reponse )
        {
        	$this->request->response = json_encode(array("code"=>"A00006"));
        }
    }

    public function action_index()
    {
        $page = Arr::get($_GET, 'page', 1);
    	
    	// Init view cache modules etc.
        $this->view = new View_Smarty('smarty:favorite/index');
        
        $model_favorite = Model::factory("favorite");
        
        /*
         * cache
         */
        $count = 0;
        if( 1||! $my_favorite_weibo_row = $this->cache->get('setting:favorite:'.$this->user->uid.":".$page))
        {
            $my_favorite_weibo_row = $model_favorite->list_favorite($this->user->uid, $page, 20, $count);
            $this->cache->set('setting:favorite:'.$this->user->uid.":".$page, $my_favorite_weibo_row, 24*3600);
            $this->view->count = $count;
        }
        
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
