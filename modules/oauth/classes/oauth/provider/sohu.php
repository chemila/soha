<?php defined('SYSPATH') or die('No direct script access.');

class OAuth_Provider_Sohu extends Kohana_OAuth_Provider {  
    public $name = 'sohu';
    public $send_header = false;
    public $signature = 'HMAC_SHA1';

	public function url_request_token()
	{
		return 'http://api.t.sohu.com/oauth/request_token';
	}

	public function url_authorize()
	{
        return 'http://api.t.sohu.com/oauth/authorize';
	}

    public function url_authenticate()
    {
        return 'http://api.t.sohu.com/oauth/authorize';
    }

	public function url_access_token()
	{
		return 'http://api.t.sohu.com/oauth/access_token';
	}
}

