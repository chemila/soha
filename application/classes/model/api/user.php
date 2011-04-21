<?php defined('SYSPATH') or die('No direct script access.');

class Model_API_User extends Model_API
{
	/*
	 * 创建用户
	 * 
	 * @param int $_POST['suid'] 微博UID
	 * @param string $_POST['source'] 来自哪个微博
	 * @param string $_POST['nick'] 用户微博昵称
	 * @param string $_POST['intro'] 用户简介
	 * @param string $_POST['portrait'] 用户头像
	 * @param int $_POST['friends_count'] 好友人数
	 * @param int $_POST['followers_count'] 粉丝人数
	 * @param int $_POST['statuses_count'] 发送的微博 数量
	 * @param int $_POST['gender'] 性别
	 * @param string $_POST['country'] 国家
	 * @param string $_POST['privince'] 省份
	 * @param string $_POST['city'] 城市
	 * @param string $_POST['location'] 用户所在地
	 * @param string $_POST['verified'] 用户是否认证
	 * @param string $_POST['ip'] 用户IP地址
	 * @param string $_POST['domain_name'] 用户微博访问的链接
	 * return array
	 */
    public function create($user_info)
    {
        unset($user_info['friends_count'], $user_info['followers_count'], $user_info['statuses_count']);
        $response = $this->post('/user/checkin.php', $user_info);

        if( $this->failed($response) )
        {
            return false;
        }

        if( ! Arr::get($response['result'], 'uid', false))
        {
            throw new Model_API_Exception('Create user failed, no uid response');
        }

        return $response['result'];
    }

    /*
     * 更新用户信息
     * @param $uid
     * @array()
     * return bool
     */
    public function update($data)
    {
        $response = $this->post('/user/modifyuserinf.php', $data);
        
        if( $this->failed($response) )
        {
            return false;
        }
        
        return true;
    }
    
    /*
     * 得到用户信息
     * @param $uid
     */
    public function get_user_info($data)
    {
    	$response = $this->post('/user/getuserinfo.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
        
        return $response['result'];
    }
    
    /*
     * 登陆 验证
     * @param $username
     * @return bool
     */
    public function check_login($data)
    {
    	$response = $this->post('/user/login.php', $data);
        	
        if( $this->failed($response) )
        {
            return false;
        }
        	
        return $response['result'];
    }
    
    /*
     * 得到用户类型
     * @param int $uid
     * @return int
     */
    public function get_user_type($data)
    {
    	$response = $this->post('/user/getusertype.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
        
        return $response['result'];
    }
    
    /*
     * 得到 用户的 uid
     * @param $username
     */
    public function get_uid_from_username($data)
    {
    	$response = $this->get_user_info($data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
        
        return $response['result'];
    }
    
    /**
     * 添加关注人（支持批量，一次最多100个）
     * @param int $uid
     * @param string $fuids
     * return bool
     */
    public function add_attention($data)
    {
    	$response = $this->post('/user/addattention.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
    	
        return true;
    }
    
    /*
     * 删除 关注人 （支持批量，一次最多100个）
     * @param int $uid
     * @param string $fuids
     */
    public function delete_attention($data)
    {
    	$response = $this->post('/user/deleteattention.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
    	
        return true;
    }
    
    /**
     * 查询 关注人 
     * @param int $uid
     */
    public function attention_list($data)
    {
    	$response = $this->post('/user/getuserattentionlist.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
    	
        return $response['result'];
    }
    
    /**
     * 查询 关注人个数 
     * @param int $uid
     */
    public function attention_count($data)
    {
    	$response = $this->post('/user/getattentioncount.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
    	
        return $response['result'];
    }
    
    /**
     * 添加好友（支持批量，一次最多100个）
     * @param int $uid
     * @param string $fuids
     * return bool
     */
    public function add_friend($data)
    {
    	$response = $this->post('/user/addfriends.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
    	
        return true;
    }
    
   /*
     * 删除好友 （支持批量，一次最多100个）
     * @param int $uid
     * @param string $fuids
     * return bool
     */
    public function delete_friend($data)
    {
    	$response = $this->post('/user/deletefriends.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
    	
        return true;
    }
    
    /*
     * 查询 好友列表
     * @param  int $uid
     * @return array()
     */
    public function list_friend($data)
    {
    	$response = $this->post('/user/getfriendlist.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
        
        return $response['result'];
    }
    
    /*
     * 列出好友总是
     * @param int $uid
     * return bool
     */
    public function count_friend($data)
    {
    	$response = $this->post('/user/getfriendcount.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
    	
        return $response['result'];
    }
    
     /**
     * 添加好友请求（支持批量，一次最多100个）
     * @param int $uid
     * @param string $fuids
     * return bool
     */
    public function add_fried_request($data)
    {
    	$response = $this->post('/user/addfriendsrequest.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
    	
        return true;
    }
    
   /*
     * 删除好友 请求（支持批量，一次最多100个）
     * @param int $uid
     * @param string $fuids
     * return bool
     */
    public function delete_fried_request($data)
    {
    	$response = $this->post('/user/deletefriedrequest.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
    	
        return true;
    }
    
    /*
     * 查询 好友请求列表
     * @param  int $uid
     * @return array()
     */
    public function list_friend_request($data)
    {
    	$response = $this->post('/user/getnewfriendsrequest.php', $data);
    	
        if( $this->failed($response) )
        {
            return false;
        }
        
        return $response['result'];
    }
    
    /**
     * 重置新增粉丝 提示数量置0
     * @param int $uid
     * return bool
     */
    public function reset_new_attention($data)
    {
    	$response = $this->post('/user/updateattentioncount.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return true;
    }
    
    
    /**
     * 重置新好友 提示数量置0
     * @param int $uid
     * return bool
     */
    public function reset_new_friend($data)
    {
    	$response = $this->post('/user/updatefriendscount.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return true;
    }
    
    /**
     * 添加 黑名单
     * @param int $uid
     * return bool
     */
    public function add_block($data)
    {
    	$response = $this->post('/user/addblock.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return true;
    }
    
    /**
     * 删除 黑名单
     * @param int $uid
     * return bool
     */
    public function delete_block($data)
    {
    	$response = $this->post('/user/deleteblock.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return true;
    }
    
    /**
     * 列出 所有 黑名单
     * @param int $uid
     * return bool
     */
    public function list_block($data)
    {
    	$response = $this->post('/user/getblocklist.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return $response['result'];
    }
}
