<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth extends Model {

    public static function instance($user)
    {
        $name = $user->get_oauth_src();
        $class = 'Model_OAuth_'.$name;
        return new $class($user);
    }

    public $name;

    public $user;

    protected $oauth_module;

    public function __construct(Model_User $user)
    {
        $this->user = $user;

        // Get from database, may be nothing, dont care
        $access_token = $user->get_access_token();

        $this->oauth_module = new OAuth($this->name, $access_token); 
    }

    public function public_timeline(Array $params = NULL)
    {
        $response =  $this->oauth_module->access($this->url_public_timeline($params), $params);         

        return $this->parse_public_timeline($response);
    }

    public function parse_public_timeline($response){}

    public function has_access_token()
    {
        return $this->user->has_access_token();
    }

    public function request_token()
    {
        return $this->oauth_module->request_token();
    }

    public function access_token($verifier = NULL) 
    {
        $access_token = $this->oauth_module->access_token($verifier);

        if($access_token and ! $this->has_access_token())
        {
            $this->user->save_token($access_token->token, $access_token->secret);
        }

        return $this;
    }
}
