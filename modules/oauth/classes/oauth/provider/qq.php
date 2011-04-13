<?php defined('SYSPATH') or die('No direct script access.');

class OAuth_Provider_QQ extends Kohana_OAuth_Provider {  
    public $name = 'qq';

    public $signature = 'HMAC_SHA1';

	public function url_request_token()
	{
		return 'https://open.t.qq.com/cgi-bin/request_token';
	}

	public function url_authorize()
	{
        return 'http://open.t.qq.com/cgi-bin/authorize';
	}

    public function url_authenticate()
    {
        return 'http://open.t.qq.com/cgi-bin/authenticate';
    }

	public function url_access_token()
	{
		return 'https://open.t.qq.com/cgi-bin/access_token';
	}
}


