<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Favorite extends Controller_Authenticated {
	
    public function action_add()
    {
    	$id = $this->request->param("mid", Arr::get($_POST, 'mid'));
    	
    	$model_favorite = Model::factory("favorite");
        $model_favorite->add_favorite(array("wid"=>$id, "uid"=>$this->user->uid));
        
        $this->response_json('M10001');
    }
    
	public function action_delete()
    {
    	$id = Arr::get($_POST, "id", "");
    	
    	if(empty($id))
    	{
            $this->response_json('R40001');
    	}
    	
    	$model_favorite = new Model_Favorite($id);//Model::factory("favorite");

 		if($model_favorite->rm_favorite())
        {
            $this->response_json();
        }
        else
        {
            $this->response_json("R40001");
        }
    }

    public function action_index()
    {
        $page = $this->get_page();
    	
        $this->init_view();
        $this->init_user($this->user);

        $favorite = new Model_Favorite;
        $favorites = $favorite->list_by_user($this->user->pk(), $page);

        $this->view->count = $favorite->count_last_query();
        $this->view->favorites = $favorite->extend_collection($favorites);
        $this->view->user_info = $this->user->as_array();
    }
}
