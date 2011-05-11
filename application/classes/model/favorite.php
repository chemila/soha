<?php defined('SYSPATH') or die('No direct script access.');

class Model_Favorite extends ORM
{
	public function add_favorite($data)
	{		
		$this->uid = $data['uid'];
		$this->wid = $data['wid'];
		$this->created_at = time();
		
		$this->save();
	}
	
    public function del_favorite($id)
    {
    	return $this->delete($id);
    }
	
    public function list_favorite($uid, $page = 1, $limit = 20, & $count)
    {
    	$my_favorite = $this->where("uid", "=", $uid)->order_by("id", "desc")->limit($limit)->offset($page - 1)->find_all()->as_array();
        $count = $this->count_last_query();
        $model_weibo = Model::factory("weibo");
        
        $my_favorite_weibo_row = array();
        for ($i=0; $i<count($my_favorite); $i++)
        {
        	$my_favorite_weibo_row[$i] = $model_weibo->where("id", "=", $my_favorite[$i]['wid'])->find()->as_array();
			$my_favorite_weibo_row[$i]['favorite_id'] = $my_favorite[$i]['id'];
        	if(!empty($my_favorite_weibo_row[$i]['media_data'])) 
        	{
        		$my_favorite_weibo_row[$i]['media_data'] = unserialize($my_favorite_weibo_row[$i]['media_data']);
        	}
        }
        
        return $my_favorite_weibo_row;
    }
}

