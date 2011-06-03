<?php defined('SYSPATH') or die('No direct script access.');

class Model_OAuth_QQ extends Model_OAuth {
    public $name = 'qq';
    public $domain = 'http://open.t.qq.com';

    public function url_public_timeline()
    {
        $this->params = array(
            'pos' => Arr::get($params, 'pos', 0),
            'reqnum' => Arr::get($params, 'reqnum', 10),
            'format' => Arr::get($params, 'format', 'json'),
        );

        return $this->domain.'/api/statuses/public_timeline?f=1';
    }

    public function parse_public_timeline()
    {
        return $this->response;
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
            $this->params += array(
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

    public function parse_user_info()
    {
        if( ! isset($this->response['data']))
            return;

        $this->response = $this->response['data'];

        return array(
            'suid' => $this->response['name'],
            'source' => $this->name,
            'nick' => $this->response['nick'],
            'domain_name' => $this->response['name'],
            'friends_count' => $this->response['idolnum'],
            'followers_count' => $this->response['fansnum'],
            'statuses_count' => $this->response['tweetnum'],
            'portrait' => $this->response['head'],
            'gender' => $this->response['sex'],
            /**
             * TODO: convert the *_code to names
            'country' => $this->response['country_code'],
            'province' => $this->response['province_code'],
            'city' => $this->response['city_code'],
            **/
            'intro' => $this->response['introduction'],
            'location' => $this->response['location'],
            'verified' => $this->response['verifyinfo'],
        );
    }

    public function url_friendships_create(Array $params)
    {
        if( ! isset($params['unique_id']))
        {
            throw new Model_OAuth_Exception('Invalid params,unique_id is required. :params', 
                    array(':params' => core::debug($params)));
        }

        $this->params = array(
            'format' => 'json',
            'name' => $params['unique_id'],
        );

        //http://open.t.qq.com/api/friends/add
        $this->request_method = self::REQUEST_METHOD_POST;
        return $this->domain.'/api/friends/add'; 
    }

    public function parse_friendships_create()
    {
        return ('ok' === $this->response['msg']);
    }

    public function url_home_timeline(Array $params)
    {
        $this->params = array(
            'reqnum' => Arr::get($params, 'count', 20),
            'pageflag' => Arr::get($params, 'page', 0),
            //'pagetime' => Arr::get($params, 'since_id', 0),
            'format' => 'json',
        );

        //http://open.t.qq.com/api/statuses/home_timeline
        return $this->domain.'/api/statuses/home_timeline';
    }

    public function parse_home_timeline()
    {
        if( ! isset($this->response['data']['info']))
            return false;

        $statuses = array();
        foreach($this->response['data']['info'] as $data)
        {
            $status = $this->parse_status($data);

            if($data['source'])
            {
                $status['root'] = $this->parse_status($data['source']);
            }
            $statuses[] = $status;
        }
        
        return $statuses;
    }

    protected function parse_status($data)
    {
        $status = array(
            'sid' => $data['id'].'',
            'timeline' => $data['timestamp'],
            'content' => $data['text'],
            'source' => $this->name,
            'uid' => $data['name'],
        );

        if( ! empty($data['image']))
        {
            $status['type'] = Model_Weibo::TYPE_IMAGE;
            $status['media_data'] = serialize(array(
                'img' => array(
                    'src' => $data['image'][0].'/2000',
                    'small' => $data['image'][0].'/160',
                    'middle' => $data['image'][0].'/460',
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
            'format' => 'json',
            'content' => utf8::substr($weibo['content'], 0, 100).$suffix,
            'clientip' => $_SERVER['REMOTE_ADDR'],
        );

        if(isset($weibo['pic']))
        {
            $this->request_options = array(
                'multipart' => array(
                    'content' => $this->params['content'],
                    'pic' => '@'.$weibo['pic'],
                ),
            );

            return $this->domain.'/api/t/add_pic';
        }
        elseif($sid)
        {
            //http://open.t.qq.com/api/t/re_add
            $this->params['reid'] = $sid;
            return $this->domain.'/api/t/re_add';
        }
        else
        {
            //http://open.t.qq.com/api/t/add
            return $this->domain.'/api/t/add';
        }
    }

    public function parse_publish_status()
    {
        return $this->response;
    }
}
