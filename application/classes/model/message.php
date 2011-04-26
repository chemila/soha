<?php defined('SYSPATH') or die('No direct script access.');

class Model_Message extends ORM
{
	public function __construct()
	{
		
	}
	
	public function get_all_sended_msg($data)
	{
		$response = Model_API::factory("message")->get_sended($data);
		
		return $response;
	}
	
	public function get_all_received_list($data)
	{
		$response = Model_API::factory("message")->get_message_all($data);
		
		return $response;
	}
	
	public function send($data)
	{
		$response = Model_API::factory("message")->send_message($data);
		
		return $response;
	}
	
	public function del($data)
	{
		$response = Model_API::factory("message")->delete_message($data);
		
		return $response;
	}
	
	public function get_msginfo($data)
	{
		$response = Model_API::factory("message")->get_message_info($data);
		
		return $response;
	}
	
	public function get_collect($data)
	{
		$response = Model_API::factory("message")->get_collect($data);
		
		return $response;
	}
	
	public function get_uid($data)
	{
		$response = Model_API::factory("user")->get_uid($data);
		
		return $response;
	}
}