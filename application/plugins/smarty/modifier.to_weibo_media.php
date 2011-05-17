<?php
function smarty_modifier_to_weibo_media($media_data, $type = 'src')
{
    $data = unserialize($media_data);
    if( ! is_array($data))
        return;

    $map = array(
        'src' => 'large',
        'large' => 'large',
        'origin' => 'large',
        'small' => 'small',
        'thumbnail' => 'small',
        'middle' => 'middle',
        'bmiddle' => 'middle',
    ); 

    $type = Arr::get($map, $type, 'small');
    $image = Arr::get($data, 'img');
    $video = Arr::get($data, 'video');

    if($image AND 0 === strpos(Arr::get($image, $type), 'http://'))
    {
        return Arr::get($image, $type);
    }

    return '/'.Model_Weibo_Image::get_relative_file(Arr::get($image, 'src'), $type); 
}
?>

