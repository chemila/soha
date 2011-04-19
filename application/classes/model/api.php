<?php defined('SYSPATH') or die('No direct script access.');
abstract class Model_API
{
    const DOMAIN_URL = 'http://10.207.10.241/pin_user/api';

    public $error = array();
    
    public static function factory($type)
    {
        $classname = 'Model_API_'.ucfirst($type);

        return new $classname;
    }

    public function __construct()
    {
    }

    public function get($path, Array $query = NULL)
    {
        $url = self::DOMAIN_URL.$path;
	 
	    // Do a GET request
	    return Remote::get($url, array(
	        CURLOPT_POST       => FALSE,
	        CURLOPT_POSTFIELDS => http_build_query($query),
	    ));
    }

    public function post($path, Array $data)
    {
        $url = self::DOMAIN_URL.$path;

        // Do a GET request
	    return Remote::get($url, array(
	        CURLOPT_POST       => TRUE,
	        CURLOPT_POSTFIELDS => http_build_query($data),
	    ));
    }

    public function failed($response)
    {
        if(isset($response['errno']))
        {
            return 1 == $response['errno'];
        }

        if(isset($response['errmsg']))
        {
            $this->error[] = $response['errmsg'];
        }

        return false;
    }
}
