<?php defined('SYSPATH') or die('No direct script access.');

abstract class Model_OAuth {
    protected $name;

    protected $oauth_module;

    protected $params = array();

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

        $url = call_user_func(array($this, 'url_'.$method), $params);
        $response = $this->oauth_module->access($url,  $this->params);

        return call_user_func(array($this, 'parse_'.$method), $response);
    }
}
