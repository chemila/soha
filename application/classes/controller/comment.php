<?php
class Controller_Comment extends Controller_Authenticated
{
	public function action_index()
	{
        $page = $this->request->param('page', Arr::get($_GET, 'page', 1));

		$this->model_comment = Model::factory("comment");
		$this->view = new View_Smarty("smarty:comment/index");
		
		$this->user->load();
        $this->view->user = $this->user->as_array();
        $this->view->followers = $this->user->attention_list(1);
        $this->view->general_followers = $this->user->attention_list(0);
        $this->view->friends = $this->user->friends_list();
        $this->view->followers_of_friends = $this->user->followers_of_friends();
        
		$this->get_comment_count_cache();
		$this->get_comment_cache($page);
        
        $this->request->response = $this->view->render();
	}
	
	public function get_comment_count_cache()
	{
		if( ! $model_comment_count = $this->cache->get("home:commentcount:".$this->user->pk()))
		{
			$model_comment_count = $this->model_comment->list_by_user_count($this->user->pk());
			$this->cache->set("home:commentcount:".$this->user->pk(), $model_comment_count, 86400);
		}
		
		$this->view->comments_count = count($model_comment_count);
		$this->view->count = count($model_comment_count);
	}
	
	public function get_comment_cache($page)
	{
		if( ! $comments = $this->cache->get("home:comments:".$this->user->pk()))
		{
			$comments = $this->model_comment->list_by_user($this->user->pk(), $page);
			$this->cache->set("home:comments:".$this->user->pk(), $comments, 86400);
		}
		
		$this->view->comments = $comments;
	}
	
	public function action_me()
	{
        $page = $this->request->param('page', Arr::get($_GET, 'page', 1));
		
		$this->model_comment = Model::factory("comment");
		
		$this->view = new View_Smarty("smarty:comment/me");
		
		$this->user->load();
        $this->view->user = $this->user->as_array();
        $this->view->followers = $this->user->attention_list(1);
        $this->view->general_followers = $this->user->attention_list(0);
        $this->view->friends = $this->user->friends_list();
        $this->view->followers_of_friends = $this->user->followers_of_friends();
		
		if( ! $comments = $this->cache->get("home:commentme:".$this->user->pk()))
		{
			$comments = $this->model_comment->list_by_wid($this->user->pk());
			$this->cache->set("home:commentmecount:".$this->user->pk(), $this->model_comment->count_last_query(), 86400);
			$this->cache->set("home:commentme:".$this->user->pk(), $comments, 86400);
		}
		
		$this->view->count = $this->cache->get("home:commentmecount:".$this->user->pk());

        $this->view->comments = $comments;
        $this->request->response = $this->view->render();
	}
	
	public function action_add()
	{
		$model_comments = Model::factory("comment");
		$result = $model_comments->add_comment($_POST);
		
		return $result;
	}
}
