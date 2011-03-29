<?php defined('SYSPATH') or die('No direct script access.');

class OAuth extends Kohana_OAuth {  
    public static $supports = array('sina', 'tenx', 'sohu');
    /**
     * providers including: sina, tenx, sohu, etc.
     */
    public static function factory($src) 
    {
        return new Oauth($src);
    }

    private $config = array();

    public function __construct($name) 
    {
        if( ! in_array($name, OAuth::$supports))
            throw new Kohana_OAuth_Exception("Unsupport OAuth type: :src", array(':src' => $name));

        $this->config = (array)Core::config('oauth')->$name;

        if( ! $this->config)
            throw new Kohana_OAuth_Exception('Unknown OAuth configuration :provider', 
                    array(':provider' => $name));

        $this->consumer = OAuth_Consumer::factory($this->config);
        $this->provider = OAuth_Provider::factory($name);
    }

    public function request()
    {
        $this->request_token = $this->provider->request_token($this->consumer);

        return  $this->provider->authorize_url($this->request_token, $this->config);        
    }

    public function access() 
    {
        $this->access_token = $this->provider->access_token($this->consumer, $this->request_token);
        // save access_token
    }

    public function get_userinfo($uid)
    {
    }
}
