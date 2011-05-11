<?php
function smarty_modifier_to_weibo_media($media_data, $type = NULL)
{
    $data = unserialize($media_data);
    if( ! is_array($data))
        return;

    return $type ? 
        '/'.Model_Weibo_Image::get_relative_file($data['image']['src'], $type): 
        $data['image']['src'];
}
?>

