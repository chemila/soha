<?php defined('SYSPATH') or die('No direct script access.');

class Model_Favorite extends ORM
{
	public function add_favorite($wid)
	{
		$to_insert = array(
            'uid' => $this->user->uid,
            'wid' => $wid,
            'created_at' => time()
        );
        
        return DB::insert(self::TABLE_NAME)
            ->columns(array_keys($to_insert))
            ->values(array_values($to_insert))
            ->execute($this->_db);
	}
	
    public function del_favorite($id)
    {
    	return $this->delete($id);
    }
	
    public function list_favorite($uid, $page = 1, $limit = 18, $tag = 1)
    {
    	$my_favorite = $this->where("uid", "=", $uid)->order_by("id", "desc")->limit($limit)->find_all()->as_array();
        
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

