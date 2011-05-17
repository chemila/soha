<?php
class Controller_Comment extends Controller_Authenticated
{
	public function action_index()
	{
        $page = $this->request->param('page', Arr::get($_GET, 'page', 1));

		$this->view = new View_Smarty("smarty:comment/index");
        $comment = new Model_Comment;
        $this->init_user();

        $comments = $comment->list_by_user($this->user->pk(), $page);
        $this->view->count = $comment->count_last_query();
        $this->view->comments = $comment->extend_collection($comments);
        
        $this->request->response = $this->view->render();
	}

    public function action_atme()
    {
        $page = $this->request->param('page', Arr::get($_GET, 'page', 1));

		$this->view = new View_Smarty("smarty:comment/index");
        $comment = new Model_Comment;
        $this->init_user();

        $comments = $comment->replyed_by_user($this->user->pk(), $page);
        $this->view->count = $comment->count_last_query();
        $this->view->comments = $comment->extend_collection($comments);
        
        $this->request->response = $this->view->render();
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

    protected function init_user(Model_User $user = NULL)
    {
        if( ! $user)
            $user = $this->user;

        $user->load();

        $this->view->user = $user->as_array();
        $this->view->followers = $user->attention_list(1);
        $this->view->general_followers = $user->attention_list(0);
        $this->view->friends = $user->friends_list();
        $this->view->followers_of_friends = $user->followers_of_friends();
    }
}
