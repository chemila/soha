<?php defined('SYSPATH') or die('No direct script access.');

class Model_Attention extends Model
{
	public function get_attention_list($uid, $page = 1)
	{
		$response = Model_API::factory("user")->attention_list(array('uid' => $uid, 'page' => $page));
		
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
	
	public function attention_count($uid)
	{
		$response = Model_API::factory("user")->attention_count(array('uid' => $uid));
		return $response[0];
	}
	
	public function fans_count($uid)
	{
		$response = Model_API::factory("user")->get_fans_count(array('uid' => $uid));
		return $response[0];
	}
	
	
	public function get_fans($uid, $page = 1)
	{
		$response = Model_API::factory("user")->fans_list(array('uid' => $uid, 'page' => $page));

		return $response;
	}
	
	
	public function delete_fans($data)
	{
		$response = Model_API::factory("user")->fans_del($data);
		
		return $response;
	}
}
