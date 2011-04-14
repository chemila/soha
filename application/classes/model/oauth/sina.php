<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth_Sina extends Model_OAuth {
    public $name = 'sina';

    public $domain = 'http://api.t.sina.com.cn';

    public function url_public_timeline(& $params = NULL)
    {
        $params = array(
            'count' => Arr::get($params, 'count', 10),
            'base_app' => Arr::get($params, 'base_app', 0),
        );

        return $this->domain.'/statuses/public_timeline.json'; 
    }

    public function parse_public_timeline($response)
    {
        return json_decode($response, true);
    }

}
