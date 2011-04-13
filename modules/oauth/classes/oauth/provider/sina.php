<?php defined('SYSPATH') or die('No direct script access.');

class OAuth_Provider_Sina extends Kohana_OAuth_Provider {  
    public $name = 'sina';

    public $signature = 'HMAC_SHA1';

	public function url_request_token()
	{
		return 'http://api.t.sina.com.cn/oauth/request_token';
	}

	public function url_authorize()
	{
        return 'http://api.t.sina.com.cn/oauth/authorize';
	}

    public function url_authenticate()
    {
        return 'http://api.t.sina.com.cn/oauth/authenticate';
    }

	public function url_access_token()
	{
		return 'http://api.t.sina.com.cn/oauth/access_token';
	}
}
