<?php defined('SYSPATH') or die('No direct script access.');

class OAuth extends Kohana_OAuth {  
    public $name = '';

    /**
     * providers including: sina, tenx, sohu, etc.
     */
    public static function factory($src) 
    {
        return new Oauth($src);
    }

    public function __construct($name) 
    {
        if( ! in_array($name, array_keys((array)Core::config('oauth'))))
            throw new Kohana_OAuth_Exception("Unsupported OAuth provider: :src", array(':src' => $name));

        $config = (array)Core::config('oauth')->$name;

        $this->name = $name;
        $this->consumer = OAuth_Consumer::factory($config);
        $this->provider = OAuth_Provider::factory($name);
    }

    /**
     * TODO: remove callback from config file, pass as parameter instead
     */
    public function request_token()
    {
        $request_token = $this->provider->request_token($this->consumer);
        $request_token->session_save($this->name);

        // TODO: check every provider whether the oauth_callback is required
        return  $this->provider->authorize_url(
            $request_token, 
            array('oauth_callback' => $this->consumer->callback)
        );        
    }

    public function access_token($verifier = NULL) 
    {
        if($access_token = OAuth_Token::session_factory('access', $this->name))
        {
            return $access_token;
        }

        $request_token = OAuth_Token::session_factory('request', $this->name);
        $request_token->verifier($verifier);

        $access_token = $this->provider->access_token($this->consumer, $request_token);
        $access_token->session_save($this->name);

        return $access_token;
    }

    public function access($url, $method, OAuth_Token_Access $access_token, Array $params = NULL)
    {
        return $this->provider->access($url, $this->consumer, $access_token, $method, $params);
    }
}
