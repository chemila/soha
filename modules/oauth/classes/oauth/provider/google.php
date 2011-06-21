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
        return 'https://www.google.com/accounts/OAuthAuthorizeToken';
	}

    public function url_authenticate()
    {
        return 'https://www.google.com/accounts/OAuthAuthorizeToken';
    }

	public function url_access_token()
	{
		return 'https://www.google.com/accounts/OAuthGetAccessToken';
	}
}

