<?php defined('SYSPATH') or die('No direct script access.');

class OAuth extends Kohana_OAuth {  
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
        if( ! in_array($name, array_keys((array)Core::config('oauth'))))
            throw new Kohana_OAuth_Exception("Unsupported OAuth provider: :src", array(':src' => $name));

        $config = (array)Core::config('oauth')->$name;

        $this->consumer = OAuth_Consumer::factory($config);
        $this->provider = OAuth_Provider::factory($name);
    }

    public function request_token()
    {
        $this->request_token = $this->provider->request_token($this->consumer);
        $this->request_token->session_save();

        // TODO: check every provider whether the oauth_callback is required
        return  $this->provider->authorize_url(
            $this->request_token, 
            array('oauth_callback' => $this->consumer->callback)
        );        
    }

    public function access_token($verifier = NULL) 
    {
        $this->request_token = OAuth_Token::session_factory('request');
        $this->request_token->verifier($verifier);

        $this->access_token = $this->provider->access_token($this->consumer, $this->request_token);
        $this->access_token->session_save();

        return $this->access_token;
    }

    public function access($url, $method, Array $params = NULL)
    {
        $this->access_token = OAuth_Token::session_factory('access');
        return $this->provider->access($url, $this->consumer, $this->access_token, $method, $params);
    }
}
