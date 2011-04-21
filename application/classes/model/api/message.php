<?php defined('SYSPATH') or die('No direct script access.');

class Model_API_Message extends Model_API
{
    public function __construct()
    {
    }

  /**
　   * 发送消息   （支持批量，一次最多100个）
　   * @param array $data
   * @param int $data['uid'] 发送人用户ID
   * @param string $data['fuids'] 接收人用户ID  多人 用 ,分开
   * @param string $data['content'] 消息内容
   * return bool
　   */
    public function send_message($data)
    {
    	$response = $this->post('/message/sendmsg.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return true;
    }
    
    /**
　   	* 删除消息内容
　   	* @param int $uid
    * @param int $msg_id
    * return bool
　     */  
    public function delete_message($data)
    {
    	$response = $this->post('/message/deletemsg.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return true;
    }
    
    /*
     * 得到 某个 私信内容
     * @param  int $msg_id
     */
    public function get_message_info($data)
    {
    	$response = $this->post('/message/getmsginfo.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return $response['result'];
    }
    
    /**
　   	 * 得到 某用户的 所有私信
　   	 * @param int $uid
	 * @param int $pagesize
     * @param string $ord
     * return array
　  	 */
    public function get_message_all($data)
    {
    	$response = $this->post('/message/getreceivedmsg.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return $response['result'];
    }
    
    /**
　   	 * 获取新消息
　   	 * @param int $uid
	 * @param int $pagesize
     * @param string $ord
     * return array
　  	 */
    public function get_new_message($data)
    {
    	$response = $this->post('/message/getnewmsg.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return $response['result'];
    }
      
   /**
     * 重置新消息状态
     * @param int $uid
     * return bool
     */
    public function reset_new_message($data)
    {
    	$response = $this->post('/message/updatemsgcount.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return true;
    }
    
    /**
　   	 * 读取某人已发送的消息
　   	 * @param int $uid
	 * @param int $pagesize
     * @param string $ord
     * return array
　  	 */
    public function get_sended($data)
    {
    	$response = $this->post('/message/getsendedmsg.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return $response['result'];
    }
    
    /**
     * 某人的私信 统计
     * @param int $uid
     */
    public function get_collect($data)
    {
    	$response = $this->post('/message/getcollect.php', $data);

        if( $this->failed($response) )
        {
            return false;
        }

        return $response['result'];
    }
}