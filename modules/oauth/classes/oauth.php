<?php defined('SYSPATH') or die('No direct script access.');

class OAuth extends Kohana_OAuth {  
    /**
     * providers including: sina, tenx, sohu, etc.
     */
    public static function factory() 
    {
    }

    public $privider;

    public function __construct($name) 
    {
        $this->config = (array)Core::config('oauth')->$name;

        if( ! $this->config)
        {
            throw new Kohana_OAuth_Exception('Unknown provider :provider', array(':provider' => $name));
        }

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
    }
}
