<?php defined('SYSPATH') or die('No direct script access.');

class Model_Block extends Model {
	
    public function all_block_by_user($data)
    {
    	if( !$data )
    	{
    		return false;
    	}
    	
		$this->_data = Model_API::factory('user')->list_block($data);
		
		if($this->_data) 
		{
            return $this->_data;
		}
    }
    
    public function add_block($data)
    {
    	if(empty($data['uid']) || empty($data['fuids']))
    		return false;
    		
    	return Model_API::factory("user")->add_block($data);
     }
    
    
    public function delete_block($data)
    {
    	if(empty($data['uid']) || empty($data['fuids']))
    		return false;
    		
    	return Model_API::factory("user")->delete_block($data);
    }
    
    public function count_block($data)
    {
    	if(empty($data['uid']))
    		return false;
    		
    	return Model_API::factory("user")->count_block($data);
    }
    
    public function get_all_friend($data)
    {
    	$this->_data = Model_API::factory('user')->list_friend($data);
		
		if($this->_data) 
		{
            return $this->_data;
		}
		
		return false;
    }
}