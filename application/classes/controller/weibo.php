<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Weibo extends Controller_Authenticated {
    //TODO: implement message queue and cache to optimize the speed

    public function action_show()
    {
        $id = $this->request->param('id');
        $page = $this->request->param('page', Arr::get($_GET, 'page', 1));
        $weibo = new Model_Weibo($id);

        $comments = $weibo->get_comments($page, 20);

        $this->view = new View_Smarty('smarty:weibo/comment');

        $this->view->weibo = $weibo->as_array();
        $this->view->comments = $comments;

        $this->request->response = $this->view->render();
    }

    public function action_forward(Array $params = NULL)
    {
        $wid = Arr::get($_POST, 'mid', Arr::get($params, 'wid'));
        $content = Arr::get($_POST, 'reason', Arr::get($params, 'content'));
        $comments_to = Arr::get($_POST, 'comments_to', Arr::get($params, 'comments_to', array()));

        // TODO: forward in original platform
        $current_weibo = new Model_Weibo($wid);
        $weibo = new Model_Weibo_Plaintext;

        // Save weibo data
        $weibo->uid = $this->user->pk();
        //TODO: store user category as well
        //$weibo->user_category = $this->user->category;
        $weibo->content = $content;
        $weibo->created_at = time();
        $weibo->updated_at = time();
        $weibo->rid = $current_weibo->is_root() ? $current_weibo->pk() : ((int)$current_weibo->root->pk());
        $weibo->save();
        // TODO: save sync 
        //$cache_version = $weibo->save_sync();
        if( ! $weibo->saved())
        {
            die(json_encode(array('code' => 'CC0701')));
        }

        if($ats = $weibo->ats())
        {
            foreach($ats as $at)
            {
                $atme = new Model_Atme;

                $atme->wid = $weib->pk();
                $atme->uid = $at;
                $atme->push();
            }
        }

        // Send to outbox and inbox
        $outbox = new Model_Cache_Outbox($this->user);
        $outbox->receive($weibo)->push($weibo->ats());

        $current_weibo->increse_forward();
        $current_weibo->save();

        //TODO: update user data by queue
        $this->user->load();
        $this->user->statuses_count ++;
        $this->user->save();

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

        $this->view = new View_Smarty('smarty:weibo/feed');
        $this->view->weibo = $weibo->extend();

        $json = array(
            'code' => 'A00006',
            'data' => array(
                'html' => $this->view->render(),
            ),
        );

        $this->request->response = json_encode($json);
    }

    public function action_create()
    {
        $content = Arr::get($_REQUEST, 'content');

        if( ! $content or strlen($content) > 420)
        {
            die(json_encode(array('code' => 'CC0701')));
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
        $weibo->src = 0;
        $weibo->created_at = time();
        $weibo->updated_at = time();

        // Create multiple type of weibo
        try
        {
            $weibo->set_media_data($data);
        }
        catch(Model_Weibo_Exception $e)
        {
            die(json_encode(array('code' => 'CC0701')));
        }

		$weibo->save();

		if( ! $weibo->saved())
		{
            die(json_encode(array('code' => 'CC0701')));
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
		$outbox = new Model_Cache_Outbox($this->user);
        $outbox->receive($weibo)->push($weibo->ats());

        $this->user->load();
        $this->user->statuses_count ++;
        $this->user->save();

		$this->view = new View_Smarty('smarty:weibo/feed');
        $this->view->weibo = $weibo->extend();

        $json = array(
            'code' => 'A00006',
            'data' => array(
                'html' => $this->view->render(), 
            ),
        );
		
        $this->request->response = json_encode($json);
    }

    public function action_comment_index()
    {
        $wid = Arr::get($_REQUEST, 'resId');

        $weibo = new Model_Weibo($wid);
        $comments = $weibo->get_comments();
        $count = $weibo->comments->count_all();

        $comments_to = array();

        if( ! $weibo->is_root())
        {
            $uid = $weibo->root->uid;
            $original_user = new Model_User($uid);
            $original_user->load();

            if($original_user->loaded())
            {
                $comments_to = $original_user->nick;
            }
        }
        
        $this->view = new View_Smarty('smarty:weibo/comment');

        $this->view->weibo = $weibo->as_array();
        $this->view->comments = $comments;
        $this->view->comments_to = $comments_to;
        $this->view->count = $count;

        $json = array(
            'code' => 'A00006',
            'data' => $this->view->render(),
        );

        $this->request->response = json_encode($json);
    }

    public function action_comment_post()
    {
        $wid = Arr::get($_POST, 'resourceId');
        $content = Arr::get($_POST, 'content');
        $forward = Arr::get($_POST, 'forward', false);
        $comment_to = Arr::get($_POST, 'cid');
        $reply_to = Arr::get($_POST, 'cid', false);

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
            die(json_encode(array('code' => 'CC0701')));
        }

        // Increase comment count at the same time
        $weibo->comment_count ++;
        // Push weibo queue
        $weibo->push();

        //TODO: forward a weibo at the same time
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
        
        $this->view = new View_Smarty('smarty:weibo/comment_reply');

        $this->view->weibo = $weibo->as_array();
        $this->view->comment = $comment->as_array();
        $this->view->comment['user'] = $this->user->as_array();

        $json = array(
            'code' => 'A00006',
            'data' => $this->view->render(),
        );

        $this->request->response = json_encode($json);
    }

    public function action_comment_delete()
    {
        $cid = Arr::get($_REQUEST, 'cid');

        $comment = new Model_Comment($cid);
        $code = 'CC0701';

        $weibo = $comment->weibo;
        $weibo->find();

        //if($weibo->remove('comments', $comment))
        if($comment->delete())
        {
            $code = 'A00006';
        }

        $json = array(
            'code' => $code,
        );

        die(json_encode(array('code' => $code)));
    }

    public function action_delete($id = NULL)
    {
        $wid = $this->request->param('wid', $id);

        $weibo = new Model_Weibo($wid);
        $code = 'CC0701';

        if($weibo->delete() and $weibo->comments->delete_all())
        {
            // Remove all comments
            $code = 'A00006';
        }

        die(json_encode(array('code' => $code)));
    }

    public function action_upload()
    {
        $filename = Model_Weibo_Image::upload($_FILES, 'pic1');

        if($filename)
        {
            $this->view = new View_Smarty('smarty:weibo/upload');
            $this->view->filename = $filename;

            $this->request->response = $this->view->render();
        }
    }
}
