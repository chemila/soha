<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Weibo extends Controller_Authenticated {

    public function action_show()
    {
        $id = $this->request->param('id', false);

        if( ! $id)
        {
            $this->trigger_error();
        }

        $weibo = new Model_Weibo($id);
        $user = $weibo->get_user();
        $comments = $weibo->get_comments($page, 20);
        $count = $weibo->count_last_query();

        $this->init_view();
        $this->init_user($user);

        $this->view->feeds = array($weibo->extend()->as_array());
        $this->view->comments = $weibo->extend_collection($comments);
    }

    public function action_forward(Array $params = NULL)
    {
        $wid = Arr::get($_POST, 'mid', Arr::get($params, 'wid'));
        $content = Arr::get($_POST, 'reason', Arr::get($params, 'content'));
        $comments_to = Arr::get($_POST, 'comments_to', Arr::get($params, 'comments_to', array()));

        if( ! $content or strlen($content) > 420)
        {
            $this->response_json('CX0010');
        }

        $current_weibo = new Model_Weibo($wid);
        $weibo = new Model_Weibo_Plaintext;

        // Save weibo data
        $weibo->uid = $this->user->pk();
        //TODO: store user category as well
        //$weibo->user_category = $this->user->category;
        $weibo->content = $content;
        $weibo->created_at = time();
        $weibo->updated_at = time();
        $weibo->rid = $current_weibo->is_root() ? $current_weibo->pk() : ((int)$current_weibo->rid);
        $weibo->save();
        // TODO: save sync 
        //$cache_version = $weibo->save_sync();
        if( ! $weibo->saved())
        {
            $this->response_json('CC0701');
        }

        if($ats = $weibo->ats())
        {
            $ats[] = $current_weibo->uid;
            foreach($ats as $at)
            {
                $atme = new Model_Atme;

                $atme->wid = $weibo->pk();
                $atme->uid = $at;
                $atme->push();
            }
        }

        // Send to outbox and inbox
		$friends = $this->_friend_cache->value();
        $outbox = new Model_Cache_Outbox($this->user);
        $users = array_merge($ats, $friends);
        $outbox->receive($weibo->pk())->push($users);

		// Push unread cache
		$this->_unread_cache->push_atme($ats)->push_feed($friends);

        $current_weibo->increse_forward();
        $current_weibo->save();

        //TODO: update user data by queue
        $this->user->load();
        $this->user->statuses_count ++;
        $this->user->save();

        // Publish weibo according to user setting of weibo
        if($this->user->get_setting('weibo', true))
        {
            $weibo_cache = new Model_Cache_Weibo($this->user);
            $weibo_cache->receive($weibo);
            unset($weibo_cache);
        }
        
        // Means forward when post comment, no more actions required
        if($params)
            return true;

        if($comments_to)
        {
            foreach($comments_to as $id)
            {
                $comment = new Model_Comment;

                $comment->uid = $this->user->pk();
                $comment->content = $content;
                $comment->wid = $weibo->pk();
                $comment->created_at = time();
                // Push queue
                $comment->push();
            }
        }

        $this->init_view('feed');
        $this->view->weibo = $weibo->extend()->as_array();

        $this->response_json('A00006', array('html' => $this->view->render()));
    }

    public function action_create()
    {
        $content = Arr::get($_POST, 'content');

        if( ! $content or strlen($content) > 420)
        {
            $this->response_json('CC0701');
        }

        $type = 0;
        $data = array();

        /** Check media data first
         *  if upload a image: type += 1
         *  add a video src type += 2
         */
        if( ! empty($_POST['pic']))
        {
            $type += 1;
            $data['image'] = $_POST['pic'];
        }

        if($video = Arr::get($_POST, 'video'))
        {
            $type += 2;
            $data['video'] = $video;
        }

        $weibo = Model_Weibo::instance($type);

        $weibo->content = $content;
        $weibo->uid = $this->user->pk();
        $weibo->timeline = time();
        $weibo->type = $type;
        $weibo->created_at = time();
        $weibo->updated_at = time();

        // Create multiple type of weibo
        try
        {
            $weibo->set_media_data($data);
        }
        catch(Model_Weibo_Exception $e)
        {
            $this->response_json('CC0701');
        }

		$weibo->save();

		if( ! $weibo->saved())
		{
            $this->response_json('CC0701');
		}

        if($ats = $weibo->ats())
        {
            foreach($ats as $at)
            {
                $atme = new Model_Atme;

                $atme->wid = $weibo->pk();
                $atme->uid = $at;
                $atme->push();
            }
        }

        // Send to outbox and push into users inboxes
		$friends = $this->_friend_cache->value();
        $outbox = new Model_Cache_Outbox($this->user);
        $users = array_merge($ats, $friends);
        $outbox->receive($weibo->pk())->push($users);
        unset($outbox, $users);
		
		// Push unread cache
		$this->_unread_cache->push_atme($ats)->push_feed($friends);

        $this->user->load();
        $this->user->statuses_count ++;
        $this->user->save();

        // Publish weibo according to user setting of weibo
        if($this->user->get_setting('weibo', true))
        {
            $weibo_cache = new Model_Cache_Weibo($this->user);
            $weibo_cache->receive($weibo);
            unset($weibo_cache);
        }

        $this->init_view('feed');
        $this->view->weibo = $weibo->extend()->as_array();

        $this->response_json('A00006', array('html' => $this->view->render()));
    }

    public function action_comment_index()
    {
        $wid = Arr::get($_GET, 'resId');

        $weibo = new Model_Weibo($wid);
        $comments = $weibo->get_comments();
        $count = $weibo->comments->count_all();

        $comments_to = array();

        if( ! $weibo->is_root())
        {
            $uid = $weibo->root->find($weibo->rid)->uid;
            $original_user = new Model_User($uid);
            $original_user->load();

            if($original_user->loaded())
            {
                $comments_to = $original_user->nick;
            }
        }
        
        $this->init_view('comment');

        $this->view->weibo = $weibo->as_array();
        $this->view->comments = $weibo->extend_collection($comments);
        $this->view->comments_to = $comments_to;
        $this->view->count = $count;

        $this->response_json('A00006', $this->view->render());
    }

    public function action_comment_post()
    {
        $wid = Arr::get($_POST, 'resourceId');
        $content = Arr::get($_POST, 'content');
        $forward = Arr::get($_POST, 'forward');
        $reply_to = Arr::get($_POST, 'replyUid');
        //$comment_to = Arr::get($_POST, 'cid');

        $comment = new Model_Comment;
        $weibo = new Model_Weibo($wid);
        $this->user->load();

        $comment->wid = $wid;
        $comment->content = $content;
        $comment->uid = $this->user->pk();
        $comment->created_at = time();

        if($reply_to)
        {
            $comment->rid = (int)$reply_to;
        }

        $comment->save();

        if( ! $comment->saved())
        {
            $this->response_json('CC0701');
        }

        // Increase comment count at the same time
        $weibo->reload();
        $weibo->comment_count ++;
        $weibo->save();

		// Push unread cache
		$this->_unread_cache->push_atcmt($comment->rid)->push_comment($weibo->uid);

        if($forward)
        {
            $params = array(
                'wid' => $wid,
                'content' => $content,
            );

            try
            {
                $this->action_forward($params);
            }
            catch(Exception $e){}
        }
        
        $this->init_view('comment_reply');

        $comment->user = $this->user->as_array();
        $this->view->weibo = $weibo->as_array();
        $this->view->comment = $comment->as_array();

        $this->response_json('A00006', $this->view->render());
    }

    public function action_comment_delete()
    {
        $cid = Arr::get($_REQUEST, 'commentId');
        $uid = Arr::get($_REQUEST, 'resUid');

        $comment = new Model_Comment($cid);
        $code = 'CC0701';
        
		$weibo = $comment->weibo;
        
		//if($weibo->remove('comments', $comment))
        if($uid == $this->user->pk() and $comment->delete())
        {
            $weibo->comment_count = max(0, $weibo->comment_count - 1);
            $weibo->save();

            $code = 'A00006';
        }

        $this->response_json($code);
    }

    public function action_delete($id = NULL)
    {
        $wid = $this->request->param('id', Arr::get($_REQUEST, 'mid', $id));

        $code = 'A00006';

        try
        {
            $weibo = new Model_Weibo($wid);

            $outbox_cache = new Model_Cache_Outbox($this->user);
            $users = array_merge($weibo->ats(), $this->_friend_cache->value());
            $outbox_cache->remove($wid)->pull($users);
            
            $inbox = new Model_Inbox;
            $outbox = new Model_Outbox;
            $atme = new Model_Atme;

            $inbox->move_to_trash(array('wid' => $wid));
            $outbox->move_to_trash(array('wid' => $wid));
            $atme->move_to_trash(array('wid' => $wid));

            $weibo->delete();

            $this->user->load();
            $this->user->statuses_count --;
            $this->user->save();
        }
        catch(Exception $e)
        {
            $code = 'CC0701';
        }

        $this->response_json($code);
    }

    public function action_upload()
    {
        try
        {
            $filename = Model_Weibo_Image::upload($_FILES, 'pic1');
        }
        catch(Exception $e){}

        if($filename)
        {
            $this->init_view('upload');

            $this->view->filename = $filename;
        }
        else
        {
            $this->response_json('CC0701');
        }
    }

    public function action_refresh()
    {
        $after = Arr::get($_POST, 'after');
        $limit = Arr::get($_POST, 'unread', 1);

        $since_id = str_replace('wid_', '', $after);
        $inbox = $this->user->inbox_since($since_id, $limit);

        $this->init_view('feeds');
        $weibo = new Model_Weibo;
        $feeds = $weibo->get_from_ids($inbox);
        $this->view->feeds = $feeds;

        $data = array(
            'total' => count($feeds),
            'html' => $this->view->render(),
        );

        $this->_unread_cache->clear('feed');
        $this->response_json('A00006', $data);
    }
}
