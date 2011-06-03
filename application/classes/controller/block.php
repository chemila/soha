<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Block extends Controller_Authenticated {

    public function action_index()
    {
        $blocks = $this->user->list_block($this->get_page());

        $this->init_view();
		
        $this->init_user($this->user);
        
        $this->view->block_count = $this->user->count_block();
        $this->view->blocks = $blocks;
        $this->view->count = $this->view->block_count;
    }

    public function action_delete()
    {
    	$fuids = Arr::get($_POST, "touid", '');
    	
    	if(empty($fuids))
    	{
    		$this->response_json("E00002");
    	}
    	
    	$this->user->delete_block($fuids);
 
    	$this->response_json("A00006");
    }
}