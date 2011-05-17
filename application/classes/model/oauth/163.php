<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth_163 extends Model_OAuth {
    public $name = '163';
    public $domain = 'http://api.t.163.com';

    public function url_public_timeline(Array $params)
    {
        $this->params = array(
            'count' => Arr::get($params, 'count', 10),
            'base_app' => Arr::get($params, 'base_app', 0),
        );

        return $this->domain.'/statuses/public_timeline.json'; 
    }

    public function parse_public_timeline()
    {
        return $this->response;
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

    public function parse_user_info()
    {
        if( ! isset($this->response['id']))
            return;

        return array(
            'suid' => $this->response['id'],
            'source' => $this->name,
            'nick' => $this->response['name'],
            'domain_name' => $this->response['screen_name'],
            'portrait' => $this->response['profile_image_url'],
            'friends_count' => $this->response['friends_count'],
            'followers_count' => $this->response['followers_count'],
            'statuses_count' => $this->response['statuses_count'],
            'gender' => $this->response['gender'],
            /**
             * unsupported
            'country' => $this->response[''],
            'province' => $this->response['province'],
            'city' => $this->response['city'],
            */
            'intro' => $this->response['description'],
            'location' => $this->response['location'],
            'verified' => $this->response['verified'],
        );
    }
}
