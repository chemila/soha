<?php defined('SYSPATH') or die('No direct script access.');

class OAuth_Provider_Flickr extends Kohana_OAuth_Provider {  
    public $name = 'flickr';
    public $send_header = true;
    public $signature = 'HMAC_SHA1';

	public function url_request_token()
	{
		return 'http://www.flickr.com/services/oauth/request_token';
	}

	public function url_authorize()
	{
		return 'http://www.flickr.com/services/oauth/authorize';
	}

    public function url_authenticate()
    {
		return 'http://www.flickr.com/services/oauth/authorize';
    }

	public function url_access_token()
	{
		return 'http://www.flickr.com/services/oauth/authorize';
	}
}


