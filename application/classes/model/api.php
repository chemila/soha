<?php defined('SYSPATH') or die('No direct script access.');
abstract class Model_API
{
    public static $domain_url;
    public $error = array();
    
    public static function factory($type)
    {
        $classname = 'Model_API_'.ucfirst($type);
        self::$domain_url = Core::config('api')->get('base_url');

        return new $classname;
    }

    public function get($path, Array $query = NULL)
    {
        $url = self::$domain_url.$path;
	 
	    // Do a GET request
	    $response = Remote::get($url, array(
	        CURLOPT_POST       => FALSE,
	        CURLOPT_POSTFIELDS => http_build_query($query),
	    ));

        $array = json_decode($response, TRUE);

        if( ! $this->failed($array))
        {
            return $array;
        }
    }

    public function post($path, Array $data)
    {
        $url = self::$domain_url.$path;

        // Do a GET request
	    $response = Remote::get($url, array(
	        CURLOPT_POST       => TRUE,
	        CURLOPT_POSTFIELDS => http_build_query($data),
	    ));

        $array = json_decode($response, TRUE);

        if( ! $this->failed($array))
        {
            return $array;
        }
    }

    public function failed($response)
    {
        if(isset($response['errno']))
        {
            return 1 != $response['errno'];
        }

        if(isset($response['errmsg']))
        {
            $this->error[] = $response['errmsg'];
        }

        return true;
    }
}
