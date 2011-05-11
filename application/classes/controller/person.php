<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Person extends Controller_Authenticated {

    public function action_getcard()
    {
        $fuid = Arr::get($_POST, 'uid');
        
		$user = new Model_User($fuid);
        $user->load();

        $this->view = new View_Smarty('smarty:user/card');
        $this->view->user = $user->as_array();
        //TODO: check user relations
        $this->view->followed = $this->user->is_followd_by($user->pk());

        $json = array(
            'code' => 'A00006',
            'data' => $this->view->render(),
        );

        die(json_encode($json));
    }

    public function action_send_message()
    {
		$nick = urldecode(Arr::get($_POST, "name"));
		$content = urldecode(Arr::get($_POST, "content"));

        if(empty($nick) or empty($content))
		{
            die(json_encode(array('code' => 'M06006')));
		}
		
		$message = new Model_Message();
        $user = new Model_User;

        try
        {
            $uid = $user->get_uid($nick);
        }
        catch(Exception $e)
        {
            die(json_encode(array('code' => 'M09001')));
        }

        if( $uid == $this->user->pk())
        {
            die(json_encode(array('code' => 'M09002')));
        }

        $user->pk($uid);
        $user->load();

        if($this->user->is_followd_by($uid))
        {
            die(json_encode(array('code' => 'M09004')));
        }
		
		$data = array(
            "uid" => $this->user->pk(),
            "fuids" => $uid,
            "content" => $content,
		);
		$response = $message->send($data);
		
		if($response)
		{
            die(json_encode(array('code' => 'A00006')));
		}
		else 
		{
			/*
			 * 黑名单
			 */
			die(json_encode(array('code' => 'M09004')));
		}
            
        die(json_encode(array('code' => 'M09003'))); 
    }

    public function action_addfollow()
    {
        $uid = Arr::get($_POST, 'uid');

        if($uid == $this->user->pk())
        {
            die(json_encode(array('code' => 'CC2510')));
        }

        $attention = new Model_Attention();
		
		$data = array(
            "uid" => $this->user->pk(),
            "fuids" => $uid
        );
				
		$result = $attention->add_attention($data);
		
		if($result['result'] === false)
		{
			/* 系统错误 */
			die(json_encode(array('code' => 'M00908')));
		}
		else if ($result['result'] === -1)
		{
			/* 黑名单 */
			die(json_encode(array('code' => 'M13002')));
		}
		else if($result['result'] === 1)
		{
			/* 已经添加了关注 */
			die(json_encode(array('code' => 'CC2510')));
		}

        $json = array(
            'code' => 'A00006',
            'data' => array(),
        );

        die(json_encode($json));
    }

    public function action_searchat()
    {
        $nick = Arr::get($_REQUEST, 'atkey');

        $user = new Model_User;
        $users = $user->like($nick);

        if($users)
        {
            $json = array(
                'code' => 'A00006',
                'data' => $users,
            );
        }

        die(json_encode($json));
    }
}
