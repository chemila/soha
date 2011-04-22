<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Weibo extends Controller_Authenticated {


    public function action_forward()
    {
        $wid = $this->request->param('wid', 1);  
        $content = Arr::get($_POST, 'content', 'test hello');
        // Comments to weibo(original, current) at the same time
        $comments_to = Arr::get($_POST, 'comments_to', array(2));
        // TODO: forward in original platform

        $current_weibo = new Model_Weibo($wid);
        $weibo = new Model_Weibo_Plaintext;

        $weibo->author = $this->user;
        $weibo->content = $content;

        if($current_weibo->is_original())
        {
            $weibo->original = $current_weibo;
        }
        else
        {
            $weibo->original = $current_weibo->get_original();
        }

        if( ! $weibo->save())
        {
            // Deal with error
            exit(0);
        }

        $current_weibo->increse_forward();

        if($comments_to)
        {
            if( ! is_array($comments_to))
            {
                $comments_to = array($comments_to);
            }
            foreach($comments_to as $id)
            {
                $comment = new Model_Comment;

                $comment->author = $this->user;
                $comment->content = $content;
                $comment->weibo = new Model_Weibo($id);

                $comment->save();
            }
        }
        die('finish');
        $this->view = new View_Smarty('json:weibo/forward');
    }
}

