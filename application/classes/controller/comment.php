<?php
class Controller_Comment extends Controller_Authenticated {
	public function action_index()
	{
        $page = $this->get_page();

        $this->init_view();
        $this->init_user($this->user);

        $this->_unread_cache->clear('comment');

        $comment = new Model_Comment;
        $comments = $comment->list_by_user($this->user->pk(), $page);

        $this->view->count = $comment->count_last_query();
        $this->view->comments = $comment->extend_collection($comments);
	}

    public function action_atme()
    {
        $page = $this->get_page();

        $this->init_view('index');
        $this->init_user($this->user);

        $this->_unread_cache->clear('atcmt');

        $comment = new Model_Comment;
        $comments = $comment->replyed_by_user($this->user->pk(), $page);

        $this->view->count = $comment->count_last_query();
        $this->view->comments = $comment->extend_collection($comments);
    }
	
	public function action_add()
	{
		$content = Arr::get($_POST, "content");
		$reply_uid = Arr::get($_POST, "reply_uid");
		$wid = Arr::get($_POST, "wid");

		if(empty($content) || empty($reply_uid) || empty($wid))
			return ;

		$comment = new Model_Comment;

        $comment->wid = $wid;
        $comment->content = $content;
        $comment->uid = $this->user->pk();
        $comment->created_at = time();
        $comment->rid = $reply_uid;

        $comment->save();

        if($comment->saved())
        {
            $weibo = new Model_Weibo($wid);
            $weibo->reload();
            $weibo->comment_count ++;
            $weibo->save();
        }
	}
}
