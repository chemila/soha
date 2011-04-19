<?php defined('SYSPATH') or die('No direct script access.');

class Model_User extends Model {
    const TABLE_NAME = 'user';

    public function __construct($uid = NULL)
    {
        if($uid)
        {
            $this->uid = $uid;
        }

        $this->data = array();
    }

    public function get_info() {
        // get user info through API like: 
        $this->data = array(
            'uid' => $this->uid,
        );

        return $this->data;
    }

    public function get_access_token()
    {
        return DB::select('*')
            ->from('user_token')
            ->where('uid', '=', $this->uid)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();
    }

    public function get_oauth_src()
    {
        return 'qq';
    }

    public function forword_weibo($weibo, $content)
    {
    }

    public function publish_weibo($weibo)
    {
    }

    public function __tostring()
    {
        if( ! $this->data)
        {
            $this->get_info();
        }

        return $this->uid;
    }

    public function save_token($token, $secret)
    {
        return DB::insert('user_token')
            ->columns(array('uid', 'token', 'secret', 'created_at', 'updated_at'))
            ->values(array($this->uid, $token, $secret, time(), time()))
            ->execute($this->_db);
    }

    public function has_access_token()
    {
        $record =  DB::select('id')
            ->from('user_token')
            ->where('uid', '=', $this->uid)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();

        return ! empty($record);
    }

    /**
     * Create a user accoess api
     * Success: save user into local user table at the same time
     */
    public function create(Array $user_info)
    {
        $result = Model_API::factory('user')->create($user_info);
        
        // Create user successfully, save user info locally
        if(isset($result['uid']))
        {
            return $this->insert_or_update($result['uid'], $user_info);
        }

        return false;
    }

    public function insert_or_update($uid, $info)
    {
        $data = array(
            'uid' => $uid,       
            'suid' => $info['id'],
            'nick' => $info['nick'],
            'domain_name' => $info['domain_name'],
            'friends_count' => $info['friends_count'],
            'followers_count' => $info['followers_count'],
            'portrait' => $info['portrait'],
            'gender' => $info['gender'],
            'intro' => $info['intro'],
            'country' => $info['country'],
            'province' => $info['province'],
            'city' => $info['city'],
            'location' => $info['location'],
            'verified' => $info['verified'],
        );

        if($this->check_exist($uid))
        {
            return DB::insert(self::TABLE_NAME)
                ->columns(array_keys($data))
                ->values(array_values($data))
                ->execute($this->_db);
        }
        else
        {
            return $this->update($info);
        }
    }

    public function update($info)
    {
        if( ! isset($info['suid']) or ! isset($info['source']))
        {
            throw new CE('Update user info failed, check suid and source');
        }

        $data = array(
            'nick' => $info['nick'],
            'domain_name' => $info['domain_name'],
            'friends_count' => $info['friends_count'],
            'followers_count' => $info['followers_count'],
            'portrait' => $info['portrait'],
            'gender' => $info['gender'],
            'intro' => $info['intro'],
            'country' => $info['country'],
            'province' => $info['province'],
            'city' => $info['city'],
            'location' => $info['location'],
            'verified' => $info['verified'],
        );

        $source = Core::config('oauth')->get($info['source']);

        if( ! $source)
        {
            throw new CE('Unknown oauth source config, check config.oauth please');
        }

        return DB::update(self::TABLE_NAME)
            ->set($data)
            ->where('suid', '=', $info['suid'])
            ->where('source', '=', Arr::get($source, 'source'))
            ->execute($this->_db);
    }

    public function check_exist($uid)
    {
        $res = DB::select("uid")
            ->from(self::TABLE_NAME)
            ->where('uid', '=', $uid)
            ->limit(1)
            ->execute($this->_db)
            ->as_array();

        return isset($res[0]['uid']);
    }
}
