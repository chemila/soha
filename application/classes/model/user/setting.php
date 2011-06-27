<?php defined('SYSPATH') or die('No direct script access.');

class Model_Setting extends Model_QORM {
    const CATEGORY_DEFAULT = 0;

    protected $_categories = array('comment', 'message', 'weibo');

    public function by_user($uid)
    {
        return $this->where('uid', '=', $uid)
            ->where('category', '=', self::CATEGORY_DEFAULT)
            ->limit(1)
            ->find();
    }

    public function get_default()
    {
		return array(
            'comment' => 0,
            'message' => 0,
            'where' => 1,
        );
    }

    public function get_categories()
    {
        return $this->_categories;
    }

    public function add_category($category)
    {
        $this->_categories[] = $category;

        return array_unique($this->_categories);
    }

    public function merge_default($setting)
    {
        $data = array();
        foreach($setting as $key => $value)
        {
            if(in_array($key, $this->_categories))
            {
                $data[$key] = $value;
            }
        }

        return array_merge($this->get_default(), $data);
    }

    public function get_category($name, $default = true)
    {
        if( ! $this->loaded())
        {
            $this->_load();
        }

        $setting = unserialize($this->data);

        if( ! is_array($setting))
        {
            return false;
        }

        return (bool)Arr::get($setting, $name, $default); 
    }
}
