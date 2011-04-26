<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Weibo extends Controller_Authenticated {
    //TODO: implement message queue and cache to optimize the speed

    public function action_show()
    {
        $id = $this->request->param('id');
        $page = $this->request->param('page', 1);
        $weibo = new Model_Weibo($id);

        $comments = $weibo->get_comments($page, 20);

        $this->view = new View_Smarty('smarty:weibo/comment');

        $this->view->weibo = $weibo->as_array();
        $this->view->comments = $comments;

        $this->request->response = $this->view->render();
    }

    public function action_forward(Array $params = NULL)
    {
        $wid = $this->request->param('wid', $params['wid']);  
        $content = Arr::get($_POST, 'content', $params['content']);
        $comments_to = Arr::get($_POST, 'comments_to', $params['comments_to']);
        // TODO: forward in original platform

        $current_weibo = new Model_Weibo($wid);
        $weibo = new Model_Weibo_Plaintext;

        $weibo->uid = $this->user->pk();
        $weibo->content = $content;
        $weibo->created_at = time();
        $weibo->updated_at = time();
        $weibo->rid = $current_weibo->is_root() ? $current_weibo->pk() : $current_weibo->root->pk();

        //$weibo->save();
        $cache_version = $weibo->save_sync();

        $current_weibo->increse_forward();
        $current_weibo->save();

        if($comments_to)
        {
            foreach($comments_to as $id)
            {
                $comment = new Model_Comment;

                $comment->uid = $this->user->pk();
                $comment->content = $content;
                $comment->wid = $id;
                $comment->created_at = time();

                $comment->save();
            }
        }

        if($current_weibo->saved())
        {
            return 'success';
        }
    }

    public function action_create()
    {
        $content = Arr::get($_POST, 'content', 'test hello');

        $type = 0;
        $data = array();

        /** Check media data first
         *  if upload a image: type += 1
         *  add a video src type += 2
         */
        if( ! empty($_FILES))
        {
            $type += 1;
            $data['image'] = $_FILES;
        }

        if( ! $video = Arr::get($_POST, 'video'))
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
            return false;
        }

        $weibo->save();
        $weibo->saved();
    }

    public function action_comment_index()
    {
        $wid = $this->request->param('wid', 2);
        $page = $this->request->param('page', 1);
        
        $weibo = new Model_Weibo($wid);
        $comments = $weibo->get_comments($page, 10);
        $count_all = $weibo->comments->count_all();

        $comments_to = array();
        if( ! $weibo->is_root())
        {
            $original_user = new Model_User($weibo->root->find()->uid);
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
        $this->view->count_more = $count_all - 10;

        $this->request->response = $this->view->render();
    }

    public function action_comment_post()
    {
        $wid = $this->request->param('wid', 2);
        $content = Arr::get($_POST, 'content', 'ni hao a , hey u');
        $forward = Arr::get($_POST, 'agree_forward', false);
        $comment_to = Arr::get($_POST, 'comment_to', false);
        $reply_to = Arr::get($_POST, 'reply_to', false);

        $comment = new Model_Comment;

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
            die('false');
        }

        //TODO: forward a weibo at the same time
        if($forward)
        {
            $params = array(
                'wid' => $wid,
                'content' => $content,
            );

            $this->action_forward($params);
        }

        die('success');
    }

    public function action_delete($id = NULL)
    {
        $wid = $this->request->param('wid', $id);

        $weibo = new Model_Weibo($wid);

        if($weibo->delete())
        {
            // Remove all comments
            $weibo->comments->delete_all();
        }
        else
        {
            // Do not exist, show error
        }
    }
}
