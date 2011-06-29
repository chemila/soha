<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Data extends Controller_Base {

    public function action_index()
    {
        $type = Arr::get($_GET, 's', 'type');
        $version = Arr::get($_GET, 'version');

        return call_user_func(array($this, $type.'_swirl'));
    }

    protected function user_swirl()
    {
        $this->init_view('swirl_2', 'user');
    }

    protected function weibo_swirl()
    {
        $this->init_view('swirl', 'weibo');
    }

    protected function to_xml()
    {
        $xml = "<browser><l l='0'/><i i='0'/>";
        //<i i='id' e='thumb_url' h='host_name' c='caption split by x' d='width height' s='image_url' l='land_url '/>
        //<n i='id' c='0'>
        //<n i='id' c='collection_id' k1='pagoda'>
        //</n></n></browser>
        $xml .= "</n></n></browser>";
    }

    public function action_suggest()
    {
        $type = Arr::get($_GET, 's', 'user');
        $version = Arr::get($_GET, 'version');

        $this->init_view('suggest', $type);
    }
}
