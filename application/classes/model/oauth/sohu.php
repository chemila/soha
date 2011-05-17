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
            //$this->params['id'] = $params['unique_id'];
            $url = $this->domain.'/users/show/'.$params['unique_id'].'.json'; 
        }
        else
        {
            $url = $this->domain.'/users/show.json'; 
        }

        return $url;
    }

    public function parse_user_info()
    {
        if( ! isset($this->response['id']))
            return false;

        return array(
            'suid' => $this->response['id'],
            'source' => $this->name,
            'nick' => $this->response['screen_name'],
            'domain_name' => $this->response['name'],
            'portrait' => $this->response['profile_image_url'],
            'friends_count' => $this->response['friends_count'],
            'followers_count' => $this->response['followers_count'],
            'statuses_count' => $this->response['statuses_count'],
            'gender' => 0,
            /**
             * unsupported
            'country' => $this->response['country'],
            'province' => $this->response['province'],
            'city' => $this->response['city'],
            **/
            'intro' => $this->response['description'],
            'location' => $this->response['location'],
            'verified' => $this->response['verified'],
        );
    }

    public function url_friendships_create(Array $params)
    {
        if( ! isset($params['unique_id']))
        {
            throw new Model_OAuth_Exception('Invalid params,unique_id is required. :params', 
                    array(':params' => core::debug($params)));
        }

        if(is_int($params['unique_id']))
        {
            $name = $params['unique_id'];
        }
        else
        {
            $name = urlencode($params['unique_id']);
        }

        //http://api.t.sohu.com/friendships/create/nick_name.[json,xml]
        $this->request_method = self::REQUEST_METHOD_POST;
        return sprintf('%s/friendships/create/%s.json', $this->domain, $name); 
    }

    public function parse_friendships_create()
    {
        if( ! isset($this->response['id']))
            return;

        return $this->response;
    }

    public function url_home_timeline(Array $params)
    {
        $this->params = array(
            'count' => 200,
            'page' => 1,
        );

        //http://api.t.sohu.com/statuses/user_timeline/id.[json,xml]
        $this->params = array_merge($this->params, $params);
        return $this->domain.'/statuses/friends_timeline.json';
    }

    public function parse_home_timeline()
    {
        $statuses = array();
        foreach($this->response as $data)
        {
            $status = array(
                'sid' => $data['id'].'',
                'timeline' => strtotime($data['created_at']),
                'content' => $data['text'],
                'uid' => $data['user']['id'],
                'source' => $this->name,
            );

            $media_data = '';
            if( ! empty($data['original_pic']))
            {
                //$status['type'] = Model_Weibo::TYPE_IMAGE;
                $media_data = serialize(array(
                    'img' => array(
                        'src' => $data['original_pic'],
                        'small' => @$data['small_pic'],
                        'middle' => @$data['middle_pic'],
                    ),  
                ));
            }

            
            if( ! empty($data['in_reply_to_status_id']))
            {
                $status['type'] = Model_Weibo::TYPE_DEFAULT;
                $status['root'] = array(
                    'sid' => $data['in_reply_to_status_id'],
                    'timeline' => strtotime($data['created_at']),
                    'content' => $data['in_reply_to_status_text'],
                    'uid' => $data['in_reply_to_user_id'],
                    'source' => $this->name,
                );

                if($media_data)
                {
                    $status['root']['media_data'] = $media_data; 
                    $status['root']['type'] = Model_Weibo::TYPE_IMAGE;
                }
            }
            else
            {
                if($media_data)
                {
                    $status['media_data'] = $media_data; 
                    $status['type'] = Model_Weibo::TYPE_IMAGE;
                }
            }

            $statuses[] = $status;
        }
        
        return $statuses;
    }
}
