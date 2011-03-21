<?php defined('SYSPATH') or die('No direct script access.');

class OAuth_Provider_Sina extends Kohana_OAuth_Provider {  
    public $name = 'sina';

    public $signature = 'HMAC_SHA1';

	public function url_request_token()
	{
		return 'http://api.t.sina.com.cn/oauth/request_token';
	}

	public function url_authorize($sign_in_already = FALSE)
	{
		return $sign_in_already ? 
            'http://api.t.sina.com.cn/oauth/authenticate' :
            'http://api.t.sina.com.cn/oauth/authorize';
	}

	public function url_access_token()
	{
		return 'http://api.t.sina.com.cn/oauth/access_token';
	}
}
