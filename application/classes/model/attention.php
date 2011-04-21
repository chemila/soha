<?php defined('SYSPATH') or die('No direct script access.');

class Model_Attention extends Model
{
	public function __construct()
	{
		
	}
	
	public function get_attention_list($data)
	{
		$response = Model_API::factory("user")->attention_list($data);
		
		return $response;
	}
	
	public function add_attention($data)
	{
		$response = Model_API::factory("user")->add_attention($data);
		
		return $response;
	}
	
	public function delete_attention($data)
	{
		$response = Model_API::factory("user")->delete_attention($data);
		
		return $response;
	}
	
	public function attention_count($data)
	{
		$response = Model_API::factory("user")->attention_count($data);
		
		return $response;
	}
}