<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth_Sina extends Model_OAuth {
    public $name = 'sina';
    public $domain = 'http://api.t.sina.com.cn';

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

    public function parse_user_info()
    {
        if( ! isset($this->response['id']))
            return;

        $gender_map = array(
            'm' => 1,
            'f' => 2,
            'n' => 0,
        );

        return array(
            'suid' => $this->response['id'],
            'source' => $this->name,
            'nick' => $this->response['screen_name'],
            'domain_name' => $this->response['domain'],
            'portrait' => $this->response['profile_image_url'],
            'friends_count' => $this->response['friends_count'],
            'followers_count' => $this->response['followers_count'],
            'statuses_count' => $this->response['statuses_count'],
            'gender' =>  $gender_map[$this->response['gender']],
            'province' => $this->response['province'],
            'city' => $this->response['city'],
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
            $this->params['user_id'] = $params['unique_id'];
        }
        else
        {
            $this->params['id'] = $params['unique_id'];
        }


        $this->request_method = self::REQUEST_METHOD_POST;
        return $this->domain.'/friendships/create.json'; 
    }

    public function parse_friendships_create()
    {
        if( ! $this->response['id'])
            return;

        return $this->response;
    }

    public function url_home_timeline(Array $params)
    {
        $this->params = array(
            'count' => 200,
            'page' => 1,
            'feature' => 0,
        );

        $this->params = array_merge($this->params, $params);
        return $this->domain.'/statuses/friends_timeline.json';
    }

    public function parse_home_timeline()
    {
        $statuses = array();
        foreach($this->response as $data)
        {
            $status = $this->parse_status($data);
            
            if( ! empty($data['retweeted_status']))
            {
                $status['type'] = Model_Weibo::TYPE_DEFAULT;
                $status['root'] = $this->parse_status($data['retweeted_status']);
            }

            $statuses[] = $status;
        }
        
        return $statuses;
    }


    protected function parse_status($data)
    {
        $status = array(
            'sid' => $data['id'].'',
            'timeline' => strtotime($data['created_at']),
            'content' => $data['text'],
            'source' => $this->name,
            'uid' => $data['user']['id'],
        );

        if( ! empty($data['original_pic']))
        {
            $status['type'] = Model_Weibo::TYPE_IMAGE;
            $status['media_data'] = serialize(array(
                'img' => array(
                    'src' => $data['original_pic'],
                    'small' => @$data['thumbnail_pic'],
                    'middle' => @$data['bmiddle_pic'],
                ),  
            ));
        }

        return $status;
    }

    public function url_publish_status(Array $weibo)
    {
        $this->request_method = self::REQUEST_METHOD_POST;

        // invalid in boundary
        $id = Arr::get($weibo, 'id', false);
        $sid = Arr::get($weibo, 'sid', false);
        unset($weibo['id'], $weibo['sid']);

        $suffix = ' http://t.leju.com/star/weibo/show/'.$id;

        $this->params = array(
            'status' => utf8::substr($weibo['content'], 0, 100).$suffix,
            //'annotations' => json_encode(array('test' => 'hello')),
        );

        if(isset($weibo['pic']))
        {
            $this->request_options = array(
                'multipart' => array(
                    'status' => $this->params['status'],
                    'pic' => '@'.$weibo['pic'],
                ),
            );

            return $this->domain.'/statuses/upload.json';
        }
        elseif($sid)
        {
            $this->params['id'] = $sid;
            //http://api.t.sina.com.cn/statuses/repost.json
            return $this->domain.'/statuses/repost.json';
        }
        else
        {
            //http://api.t.sina.com.cn/statuses/update.json
            return $this->domain.'/statuses/update.json';
        }
    }

    public function parse_publish_status()
    {
        return $this->response;
    }

    public function url_statuses_friends(Array $params = NULL)
    {
        $cursor = Arr::get($params, 'cursor', -1);

        $this->params = array(
            'cursor' => $cursor,
            'count' => 200,       
        );

        //http://api.t.sina.com.cn/statuses/friends/:id.
        return $this->domain.'/statuses/friends.json'; 
    }

    public function parse_statuses_friends()
    {
        if( ! isset($this->response['users']))
            return false;

        $result = array();

        foreach($this->response['users'] as $user)
        {
            $result[] = $user['id'];
        }

        return $result;
    }
}
