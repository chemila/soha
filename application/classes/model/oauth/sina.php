<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth_Sina extends Model_OAuth {
    public $name = 'sina';

    public $domain = 'http://api.t.sina.com.cn';

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
        //http://api.t.sina.com.cn/users/show.json
        //http://api.t.sina.com.cn/account/verify_credentials.json
        if(isset($params['unique_id']))
        {
            if(is_int($params['unique_id']))
            {
                $this->params['user_id'] = $params['unique_id'];
            }
            else
            {
                $this->params['id'] = $params['unique_id'];
            }

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

        $gender_map = array(
            'm' => 1,
            'f' => 2,
            'n' => 0,
        );

        return array(
            'suid' => $data['id'],
            'source' => $this->name,
            'nick' => $data['screen_name'],
            'domain_name' => $data['domain'],
            'portrait' => $data['profile_image_url'],
            'friends_count' => $data['friends_count'],
            'followers_count' => $data['followers_count'],
            'statuses_count' => $data['statuses_count'],
            'gender' =>  $gender_map[$data['gender']],
            'province' => $data['province'],
            'city' => $data['city'],
            'intro' => $data['description'],
            'location' => $data['location'], 
            'verified' => $data['verified'],
        );
    }
}
