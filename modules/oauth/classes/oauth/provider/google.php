<?php defined('SYSPATH') or die('No direct script access.');

class OAuth_Provider_Google extends Kohana_OAuth_Provider {  
    public $name = 'google';
    public $signature = 'HMAC_SHA1';

	public function request_token(OAuth_Consumer $consumer, array $params = NULL)
    {
        $params['scope'] = 'http://www.google.com/calendar/feeds http://picasaweb.google.com/data';

        return parent::request_token($consumer, $params);
    }

	public function url_request_token()
	{
		return 'https://www.google.com/accounts/OAuthGetRequestToken';
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

