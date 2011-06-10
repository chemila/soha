<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo_Mixed extends Model_Weibo {

    public function get_media_data()
    {
        $this->_load();
        $data = unserialize($this->media_data);

        return $data;
    }

    public function set_media_data(Array $data)
    {
        if( ! isset($data['image']) or ! isset($data['video']))
        {
            throw new Model_Weibo_Exception('Set media data failed, image and video are required');
        }

        $file_image = Model_Weibo_Image::upload($data['image']);
        $file_video = Model_Weibo_Video::upload($data['video']);

        if( ! $file_video or ! $file_video)
        {
            throw new Model_Weibo_Exception('Faild to upload image and video');
        }

        $this->media_data = serialize(array(
            'image' => array(
                'src' => $file_image,
            ),            
            'video' => array(
                'src' => $file_video,
            ),
        ));
    }
}

