<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Setting extends Controller_Authenticated {

    public function action_index()
    {
    	// Init view cache modules etc.
        $this->view = new View_Smarty('smarty:setting/index');
        
        $model_setting = Model::factory("setting");
        
        $result = $model_setting->where("uid", "=", $this->user->uid)->find_all()->as_array();
        if(count($result)<=0)
        {
        	$this->view->action = "add_personality";
        }
        else 
        {
        	$this->view->action = "update_personality";
        }
        
        $this->view->user_info = $this->public_user_info();
        
        $data = (empty($result[0]['data'])?"":unserialize($result[0]['data']));
        
        $this->view->datas = $data;
        
        $this->request->response = $this->view->render();
    }
    
    public function action_update_personality()
    {
		$model_setting = Model::factory("setting", array('uid' => $this->user->uid));
		
		$comment_set = Arr::get($_POST, "comment_set");
		$message_set = Arr::get($_POST, "message_set");
		$location_set = Arr::get($_POST, "location_set");
		$search_name_set = Arr::get($_POST, "search_name");
		$search_mobile_set = Arr::get($_POST, "search_mobile");
		
		$model_setting->data = serialize(
			array(
			"comment_set"=>$comment_set, 
			"message_set"=>$message_set, 
			"location_set"=>$location_set, 
			"search_name_set"=>$search_name_set, 
			"search_mobile_set"=>$search_mobile_set
			)
		);
		$model_setting->updated_at = time();
		$model_setting->save();
		
		$this->request->redirect("/setting");
    }
    
    public function action_add_personality()
    {
		$model_setting = Model::factory("setting");
		
		$comment_set = Arr::get($_POST, "comment_set");
		$message_set = Arr::get($_POST, "message_set");
		$location_set = Arr::get($_POST, "location_set");
		$search_name_set = Arr::get($_POST, "search_name");
		$search_mobile_set = Arr::get($_POST, "search_mobile");
		
		$model_setting->data = serialize(
			array(
			"comment_set"=>$comment_set, 
			"message_set"=>$message_set, 
			"location_set"=>$location_set, 
			"search_name_set"=>$search_name_set, 
			"search_mobile_set"=>$search_mobile_set
			)
		);
		$model_setting->uid = $this->user->uid;
		$model_setting->created_at = time();
		$model_setting->save();
		
		$this->request->redirect("/setting");
    }
    
    public function public_user_info()
    {
    	$user_info = Model_API::factory('user')->get_user_info(array("uid"=>$this->user->uid));
		
		return $user_info;
    }
}
