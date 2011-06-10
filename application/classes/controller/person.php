<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Person extends Controller_Authenticated {

    public function action_getcard()
    {
        $uid = Arr::get($_POST, 'uid');

        if( ! $uid)
        {
            $this->response_json('A00006', '<p class="name_card_con5">这个昵称不存在噢 :(</p>');
        }

		$user = new Model_User($uid);
        $current_user = $this->get_current_user();

        if($current_user instanceof Model_User)
        {
        	$followed = $current_user->following_of($user->pk());
            $is_self = $current_user->pk() == $user->pk();
        }
        else 
        {
        	$followed = false;
        	$is_self = false;
        }

        try
        {
            $user->load();
        }
        catch(Model_API_Exception $e)
        {
            $this->response_json('A00006', '<p class="name_card_con5">这个昵称不存在噢 :(</p>');
        }

        $this->init_view('card', 'user');

        $this->view->user = $user->as_array();
        $this->view->followed = $followed;
        $this->view->is_self = $is_self;

        $this->response_json('A00006', $this->view->render());
    }

    public function action_send_message()
    {
		$uid = urldecode(Arr::get($_POST, "uid"));
		$content = urldecode(Arr::get($_POST, "content"));

        if(empty($uid) or empty($content))
		{
            $this->response_json('M06006');
		}
		
		//$message = new Model_Message();
        $user = new Model_User($uid);

        if( $uid == $this->user->pk())
        {
            die(json_encode(array('code' => 'M09002')));
        }

        if( ! $this->user->fans_of($uid) )
        {
            die(json_encode(array('code' => 'M09004')));
        }
		
		$data = array(
            "uid" => $this->user->pk(),
            "fuids" => $uid,
            "content" => $content,
		);
		$response = $this->user->send_message($uid, $content);

		if($response === 0)
		{
            $this->response_json('M09004');
		}
		else if($response === false)
		{
            $this->response_json('E00001');
		}
    
        $this->_unread_cache->push_msg($uid);
        $this->response_json('A00006');
    }

    public function action_add_following()
    {
        $uid = Arr::get($_POST, 'uid');

        if($uid == $this->user->pk())
        {
            $this->response_json('CC2510');
        }
        if($this->is_observer($uid))
        {
            $this->response_json('CC2811');
        }

        $result = $this->add_followding($uid);
		
		if($result === false)
		{
            $this->response_json('M00908');
		}
		else if ($result === -1)
		{
            $this->response_json('M13002');
		}
		else if($result === 1)
		{
            $this->response_json('CC2510');
		}
        else
        {
            $this->response_json('A00006', 'nothing');
        }
    }

    public function action_rm_following()
    {
		$uid = Arr::get($_POST, "touid", false);
		$from = Arr::get($_POST, "fromuid", false);
		
		if( ! $uid or ! $from)
		{
			$this->response_json('CF0406');
		}

        if($from !== $this->user->pk())
        {
			$this->response_json('CF0406');
        }
		
        $result = $this->user->rm_following($uid);
		
		if( ! $result)
		{
			$this->response_json('CC2510');
		}

        // Update current user following cache
        $this->_following_cache->remove_user($uid);

        $user = new Model_User($uid);
        $outbox = new Model_Outbox;
        $wids = $outbox->list_by_user($user->pk());
        $inbox = new Model_Inbox;

        foreach($wids as $wid)
        {
            $inbox->move_to_trash(array('uid' => $this->user->pk(), 'wid' => $wid));
        }

        $this->response_json('A00006');
    }

    public function action_rm_fans()
    {
		$uid = Arr::get($_POST, "touid", false);
		$from = Arr::get($_POST, "fromuid", false);
        $isblack = Arr::get($_POST, "isblack", false);

		if( ! $uid or ! $from)
		{
			$this->response_json('CF0406');
		}

		if($from !== $this->user->pk())
        {
			$this->response_json('CF0406');
        }

        $response = $this->user->rm_fans($uid);

        if($isblack)
        {
            $this->user->add_block($uid);
        }

		if( ! $response)
		{
			$this->response_json('CC2510');
		}
		
        $this->response_json();
    }

    public function action_searchat()
    {
        $nick = Arr::get($_GET, 'atkey');

        $user = new Model_User;
        $users = $user->like($nick);

        if($users)
        {
            $this->response_json('A00006', $users);
        }
    }
    
    public function action_online()
    {
		$count = Arr::get($_GET, 'count', 1);
        $uid = Arr::get($_GET, 'user_id');

		if($uid !== $this->user->pk())
			die;

		$this->user->online = 1;
		$this->user->save();
    }

    public function action_remind()
    {
        $count = Arr::get($_GET, 'count', 1);
        $uid = Arr::get($_GET, 'user_id');
        $callback = Arr::get($_GET, 'callback');

		if($uid !== $this->user->pk())
			die;

        $value = $this->_unread_cache->value();
        $this->response_json('A00006', $value, $callback);
    }

    public function action_select()
    {
        $source = $this->user->get_source();
        $token = $this->user->get_access_token();

        if( ! $token or ! $source)
            $this->trigger_error('用户数据错误');

        $oauth = new OAuth($source, $token);
        $model_oauth = Model_OAuth::factory($oauth);
        $star = new Model_Star;
        $friends = array();
        $cursor = 1;

        while($cursor <= 10 and count($friends) < 100)
        {
            $ids = $model_oauth->statuses_friends(array('cursor' => $cursor));

            if( ! $ids)
                break;

            $friends = array_merge($friends, $ids);
            $cursor ++;
        }

        if($friends)
        {
            $stars = $star->list_by_source($source); 
            $uids = array_intersect($stars, $friends);
            $users = array();

            if($uids)
            {
                $this->init_view('select', 'user');
                $count = min(20, count($uids));

                for($i = 0; $i < $count; $i ++)
                {
                    $suid = array_shift($uids);
                    $users[] = $star->list_by_ss($suid, $source);
                }

                $this->view->users = $users;
            }
            else
            {
                $this->request->redirect('/');
            }
        }
        else
        {
            $this->request->redirect('/');
        }
    }

    public function action_choose()
    {
        $selected = Arr::get($_POST, 'selected', false);

        if($selected)
        {
            foreach($selected as $uid)
            {
                $this->add_followding($uid);                 
            }
        }
            
        $this->request->redirect('/');
    }

    protected function add_followding($uid)
    {
        $result = $this->user->add_followding($uid);
                
        if($result !== true)
            return $result;

        // Update current user following cache
        $this->_following_cache->add_user($uid);
        $this->_unread_cache->push_attention($uid);

        // Push weibo into user inbox
        $user = new Model_User($uid);
        $outbox_cache = new Model_Cache_Outbox($user);
        $outbox = new Model_Outbox;
        $wids = $outbox->list_by_user($user->pk());

        foreach($wids as $wid)
        {
            $outbox_cache->receive($wid);
        }

        $outbox_cache->push(array($this->user->pk()), FALSE);

        return true;
    }
}
