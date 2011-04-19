<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth_QQ extends Model_OAuth {
    public $name = 'qq';

    public $domain = 'http://open.t.qq.com';

    public function url_public_timeline()
    {
        $this->params = array(
            'pos' => Arr::get($this->params, 'pos', 0),
            'reqnum' => Arr::get($this->params, 'reqnum', 10),
            'format' => Arr::get($this->params, 'format', 'json'),
        );

        return $this->domain.'/api/statuses/public_timeline?f=1';
    }

    public function parse_public_timeline($response)
    {
        return json_decode($response, true);
    }

    public function url_user_info(Array $params = NULL)
    {
        // http://open.t.qq.com/api/user/other_info
        // http://open.t.qq.com/api/user/info
        $this->params = array(
            'format' => 'json',
        );

        if(isset($params['unique_id']))
        {
            $this->params = array(
                'name' => $params['unique_id'],
            );
            $url = $this->domain.'/api/user/other_info'; 
        }
        else
        {
            $url = $this->domain.'/api/user/info';
        }
        
        return $url;
    }

    public function parse_user_info($response)
    {
        $tmp = json_decode($response, true);
        $data = $tmp['data'];
        unset($tmp);

        return array(
            'suid' => $data['name'],
            'source' => $this->name,
            'nick' => $data['nick'],
            'domain_name' => $data['name'],
            'friends_count' => $data['idolnum'],
            'followers_count' => $data['fansnum'],
            'statuses_count' => $data['tweetnum'],
            'portrait' => $data['head'],
            'gender' => $data['sex'],
            /**
             * TODO: convert the *_code to names
            'country' => $data['country_code'],
            'province' => $data['province_code'],
            'city' => $data['city_code'],
            **/
            'intro' => $data['introduction'],
            'location' => $data['location'],
            'verified' => $data['verifyinfo'],
        );
    }
}
