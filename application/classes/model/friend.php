<?php defined('SYSPATH') or die('No direct script access.');

class Model_Friend extends Model
{
	public function __construct()
	{
	}
	
	public function get_friend_list($data)
	{
		$response = Model_API::factory("user")->list_friend($data);
		
		return $response;
	}
	
	public function add_friend($data)
	{
		$response = Model_API::factory("user")->add_friend($data);
		
		return $response;
	}
	
	public function delete_friend($data)
	{
		$response = Model_API::factory("user")->delete_friend($data);
		
		return $response;
	}
	
	public function get_fiend_count($data)
	{
		$response = Model_API::factory("user")->count_friend($data);
		
		return $response;
	}
}