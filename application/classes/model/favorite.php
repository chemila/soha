<?php defined('SYSPATH') or die('No direct script access.');

class Model_Favorite extends Model
{
	const TABLE_NAME = 'favorite';
	
	public function __construct(Model_User $user)
	{
		$this->user = $user;
	}
	
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
        return DB::delete(self::TABLE_NAME)
            ->where('id', '=', $id)
            ->where('uid', '=', $this->user->uid)
            ->execute($this->_db);
    }
	
    public function list_favorite($page = 1, $limit = 18, $tag = 1)
    {
        return DB::select('*')->from(self::TABLE_NAME)
        	->where('uid', '=', $this->user->uid)
            ->order_by('id', 'desc')
            ->limit($limit)
            ->offset($page - 1)
            ->execute($this->_db)
            ->as_array();
    }
}

