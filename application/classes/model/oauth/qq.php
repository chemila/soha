<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth_QQ extends Model_OAuth {
    public $name = 'qq';

    public $domain = 'http://open.t.qq.com';

    public function url_public_timeline(& $params = NULL)
    {
        $params = array(
            'pos' => Arr::get($params, 'pos', 0),
            'reqnum' => Arr::get($params, 'reqnum', 10),
            'format' => Arr::get($params, 'format', 'json'),
        );

        return $this->domain.'/api/statuses/public_timeline?f=1';
    }

    public function parse_public_timeline($response)
    {
        return json_decode($response, true);

    }
}


