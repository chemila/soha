<?php defined('SYSPATH') or die('No direct script access.');

class Model_Unread extends Model_QORM {
    protected $_table_name = 'unread';
	protected $_primary_key = 'uid';
	protected $_unserialized_status = array();
	public static $categories = array('feed', 'attention', 'comment', 'msg', 'atme', 'atcmt');

    public function get_by_user($uid)
    {
		return $this->where('uid', '=', $uid)->limit(1)->find();
    }

	public function parse()
	{
		if( ! $this->_unserialized_status)
		{
			if( ! $this->status)
			{
				$this->_unserialized_status = self::get_default();
			}
			else
			{
				$array = unserialize($this->status);
				$array = is_array($array) ? $array : array();
				return $this->_unserialized_status = array_merge(self::get_default(), $array);
			}
		}

		return $this->_unserialized_status;
	}

	public static function get_default()
	{
		return array_combine(array_values(self::$categories), array_fill(0, count(self::$categories), 0));
	}

	public function status_count($category)
	{
		if( ! in_array($category, self::$categories))
			return false;

		$array = $this->parse();
		return Arr::get($array, $category, 0);
	}

	public function increase($category, $inc = 1)
	{
		$cnt = $this->status_count($category);

		if(false === $cnt)
			return false;

		$cnt += $inc;
		$this->_unserialized_status[$category] = $cnt;

		return true;
	}

	public function save()
	{
		if(empty($this->status))
		{
			$this->status = self::get_default();
		}

		if(is_array($this->status))
		{
			$this->status = serialize($this->status);	
		}

		return parent::save();
	}
}
