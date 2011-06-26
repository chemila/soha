<?php defined('SYSPATH') or die('No direct script access.');

class OAuth_Provider_163 extends Kohana_OAuth_Provider {  
    public $name = '163';
    public $signature = 'HMAC_SHA1';

	public function url_request_token()
	{
		return 'http://api.t.163.com/oauth/request_token';
	}

	public function url_authorize()
	{
        return 'http://api.t.163.com/oauth/authenticate';
	}

    public function url_authenticate()
    {
        return 'http://api.t.163.com/oauth/authorize';
    }

	public function url_access_token()
	{
		return 'http://api.t.163.com/oauth/access_token';
	}
}


