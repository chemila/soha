<?php defined('SYSPATH') or die('No direct script access.');

class Model_Collect_Weibo extends Model_QORM {
    protected $_table_name = 'weibo_shadow';
    protected $_has_one = array(
        'root' => array(
            'model' => 'Collect_Weibo',
            'foreign_key' => 'rid',
        ),
    );
    protected $_has_many = array(
        'children' => array(
            'model' => 'Collect_Weibo',
            'foreign_key' => 'rid',
        ),       
    );

    public function fetch($status, $source)
    {
        if( ! empty($status['root']))
        {
            $root = new self;
            
            if( ! $rid = $root->check_exist($source, $status['root']['sid']))
            {
                $root->values($status['root']);
                $root->created_at = time();
                $root->updated_at = time();

                $root->save();

                $rid = $root->pk();
            }

            unset($status['root']);
            //$rid = $root->fetch($status['root'], $source);
        }

        if($pk = $this->check_exist($source, $status['sid']))
        {
            return $pk;
        }

        $this->values($status);

        $this->created_at = time();
        $this->updated_at = time();

        if( ! empty($rid))
        {
            $this->rid = $rid;
        }

        $this->save();

        if($this->saved())
        {
            return $this->pk();
        }
    }

    public function check_exist($source, $sid)
    {
        return $this->select('*')
            ->where('source', '=', $source)
            ->and_where('sid', '=', $sid)
            ->limit(1)
            ->find()
            ->pk();
    }

    public function last_id($source)
    {
        return $this->where('source', '=', $source)
            ->order_by('id', 'desc')
            ->limit(1)
            ->find()
            ->sid;
    }

    public function todo($limit = 10)
    {
        return $this->where('wid', '=', 0)
            ->and_where('rid', '=', 0)
            ->limit($limit)
            ->find_all();
    }

    public function get_sid($wid, $source = '')
    {
        return $this->where('wid', '=', $wid)
            ->and_where('source', '=', $source)
            ->limit(1)
            ->find()
            ->sid;
    }
}
