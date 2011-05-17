<?php defined('SYSPATH') or die('No direct script access.');

abstract class Model_OAuth {
    const REQUEST_METHOD_GET = 'GET';
    const REQUEST_METHOD_POST = 'POST';

    protected $name;
    protected $oauth_module;
    protected $params = array();
    protected $response;
    protected $request_method = "GET";

    public static function factory(OAuth $oauth)
    {
        $class = 'Model_OAuth_'.$oauth->name;
        return new $class($oauth);
    }

    public function __construct($oauth)
    {
        $this->name = $oauth->name;
        $this->oauth_module = $oauth;
    }

    public function __call($method, Array $params = NULL)
    {
        $params = empty($params) ? array() : $params[0];

        $method_url_name = 'url_'.$method;
        $method_parse_name = 'parse_'.$method;

        if( ! method_exists($this, $method_url_name))
        {
            throw new Model_OAuth_Exception('URL method not implemented: :method',
                    array(':method' => $method_url_name));
        }

        if( ! method_exists($this, $method_parse_name))
        {
            throw new Model_OAuth_Exception('Parse method not implemented: :method',
                    array(':method' => $method_url_name));
        }

        $url = call_user_func(array($this, $method_url_name), $params);

        try
        {
            $response = $this->oauth_module->access($url,  $this->params, $this->request_method);
            $this->response = json_decode($response, true);

            if( ! $this->response)
                return;

            return call_user_func(array($this, $method_parse_name));
        }
        catch(Exception $e)
        {
            var_dump($e->getMessage());die;
            return false;
        }
    }
}
