<?php defined('SYSPATH') or die('No direct script access.');

class OAuth extends Kohana_OAuth {  
    public $name;
    public $access_token;
    public $consumer;
    public $provider;

    public function __construct($name, $access_token = NULL) 
    {
        if( ! in_array($name, array_keys((array)Core::config('oauth'))))
            throw new Kohana_OAuth_Exception("Unsupported OAuth provider: :src", array(':src' => $name));

        $config = (array)Core::config('oauth')->get($name);

        $this->name = $name;
        $this->consumer = OAuth_Consumer::factory($config);
        $this->provider = OAuth_Provider::factory($name);

        if($access_token)
        {
            if($access_token instanceof OAuth_Token_Access)
            {
                $this->access_token = $access_token;
            }
            elseif(is_array($access_token) AND 
                   isset($access_token['token']) AND 
                   isset($access_token['secret']))
            {
                $this->access_token = new OAuth_Token_Access($access_token); 
            }
        }
    }

    public function request_token()
    {
        try
        {
            $request_token = $this->provider->request_token($this->consumer);
            $request_token->session_save($this->name);
        }
        catch(CE $e)
        {
            return false;
        }

        return  $this->provider->authorize_url(
            $request_token, 
            array('oauth_callback' => $this->consumer->callback)
        );        
    }

    public function access_token($verifier = NULL) 
    {
        if($this->access_token)
            return $this->access_token;

        $request_token = OAuth_Token::session_factory('request', $this->name);

        if( ! $request_token or ! $request_token instanceof OAuth_Token_Request)
            throw new CE('Invalid request token');

        $request_token->verifier($verifier);

        try
        {
            $this->access_token = $this->provider->access_token($this->consumer, $request_token);
            return $this->access_token;
        }
        catch(CE $e)
        {
            return false;
        }
    }

    public function access($url, Array $params = NULL, $method = "GET", Array $request_options = NULL)
    {
        if( ! $this->has_access_token())
            return $this->request_token();

        return $this->provider->access($url, $this->consumer, $this->access_token, $params, $method, $request_options);
    }

    public function has_access_token()
    {
        return $this->access_token instanceof OAuth_Token_Access;
    }
}
