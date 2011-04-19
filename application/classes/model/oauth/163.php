<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth_163 extends Model_OAuth {
    public $name = '163';

    public $domain = 'http://api.t.163.com';

    public function url_public_timeline()
    {
        $this->params = array(
            'count' => Arr::get($this->params, 'count', 10),
            'base_app' => Arr::get($this->params, 'base_app', 0),
        );

        return $this->domain.'/statuses/public_timeline.json'; 
    }

    public function parse_public_timeline($response)
    {
        return json_decode($response, true);
    }

    public function url_user_info(Array $params = NULL)
    {
        // Including unique_id goes to: http://api.t.163.com/users/show.format
        // No user info goes to: http://api.t.163.com/account/verify_credentials.format
        if(isset($params['unique_id']))
        {
            $this->params['user_id'] = $params['unique_id'];
            $url = $this->domain.'/users/show.json';
        } 
        else
        {
            $url = $this->domain.'/account/verify_credentials.json';
        }

        return $url;
    }

    public function parse_user_info($response)
    {
        $data = json_decode($response, true);

        return array(
            'suid' => $data['id'],
            'source' => $this->name,
            'nick' => $data['name'],
            'domain_name' => $data['screen_name'],
            'portrait' => $data['profile_image_url'],
            'friends_count' => $data['friends_count'],
            'followers_count' => $data['followers_count'],
            'statuses_count' => $data['statuses_count'],
            'gender' => $data['gender'],
            /**
             * unsupported
            'country' => $data[''],
            'province' => $data['province'],
            'city' => $data['city'],
            */
            'intro' => $data['description'],
            'location' => $data['location'],
            'verified' => $data['verified'],
        );
    }
}
