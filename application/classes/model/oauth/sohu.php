<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth_Sohu extends Model_OAuth {
    public $name = 'sohu';

    public $domain = 'http://api.t.sohu.com';

    public function url_user_info(Array $params = NULL)
    {
        //http://api.t.sohu.com/users/show.[json,xml]
        // http://api.t.sohu.com/account/verify_credentials.
        if(isset($params['unique_id']))
        {
            $this->params['id'] = $params['unique_id'];
            $url = $this->domain.'/users/show.json'; 
        }
        else
        {
            $url = $this->domain.'/users/show.json'; 
        }

        return $url;
    }

    public function parse_user_info($response)
    {
        $data = json_decode($response, true);

        return array(
            'suid' => $data['id'],
            'source' => $this->name,
            'nick' => $data['screen_name'],
            'domain_name' => $data['name'],
            'portrait' => $data['profile_image_url'],
            'friends_count' => $data['friends_count'],
            'followers_count' => $data['followers_count'],
            'statuses_count' => $data['statuses_count'],
            'gender' => 0,
            /**
             * unsupported
            'country' => $data['country'],
            'province' => $data['province'],
            'city' => $data['city'],
            **/
            'intro' => $data['description'],
            'location' => $data['location'],
            'verified' => $data['verified'],
        );
    }
}


