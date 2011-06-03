<?php defined('SYSPATH') or die('No direct script access.');

class Model_Cache_Weibo extends Model_Cache {

    public function receive(Model_Weibo $weibo)
    {
        $this->_data[] = $weibo;
        $data = array($weibo->pk());

        /**
        if( ! $weibo->is_root())
        {
            $weibo->root->find($weibo->rid);

            if($weibo->root->loaded())
            {
                $data['original_content'] = $weibo->root->content;
                if($weibo->root->type == Model_Weibo::TYPE_IMAGE)
                {
                    $data['original_media_data'] = $weibo->root->media_data;
                }
            }
        }
        **/

        $this->save_sync($data);

        return $this;
    }
}

