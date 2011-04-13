<?php defined('SYSPATH') or die('No direct script access.');

class OAuth_Response extends Kohana_OAuth_Response {  
    // TODO: check response for different providers
    public function valid_token()
    {
        return (bool)$this->param('oauth_token', FALSE);
    }

    public function valid_json()
    {
    }

    public function __tostring()
    {
        return implode(' ', $this->params);
    }
}
