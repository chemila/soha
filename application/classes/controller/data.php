<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Data extends Controller_Base {

    public function action_index()
    {
        $type = Arr::get($_GET, 's', 'type');
        $version = Arr::get($_GET, 'version');

        call_user_func_array(array($this, $type.'_swirl'), array('id' => $version));
    }

    protected function user_swirl($id)
    {
        //$this->init_view('swirl_2', 'user'); return;
        $this->user = new model_user($id);
        $all = $followers = $this->user->get_followers();
        $collection = array();

        foreach($followers as $obj)
        {
            $fs = $obj->get_fans();
            $collection[$obj->pk()]['name'] = $obj->nick;
            $collection[$obj->pk()]['sub'] = $fs;

            $all = array_merge($all, $fs);
        }
        
        $all = array_unique($all);

        die($this->to_xml($all, $collection));
    }

    protected function weibo_swirl($id)
    {
        $this->init_view('swirl', 'weibo');
    }

    protected function to_xml($items, $collection)
    {
        $cache_key = 'user_swirl_'.$this->user->pk().'_'.date('Ymd');
        if(false and $cached = Core::cache($cache_key, NULL, NULL, false))
            return $cached;

        $xml = "<browser><l l='0'/><i i='0'/>"."\r\n";
        //<i i='id' e='thumb_url' h='host_name' c='caption split by x' d='width height' s='image_url' l='land_url '/>
        $i = 0;
        $map = array();
        foreach($items as $item)
        {
            $i ++;
            $map[$item->pk()] = $i;
            if( ! $item->portrait) continue;
            $xml .= sprintf("<i i='%d' e='%s' h='%s' c='%s' d='%d %d' s='%s' l='%s '/>\r\n",
                $i, $item->portrait, $item->source, $item->nick,
                180, 180, $item->portrait, $item->portrait);
        }
        //<n i='id' c='0'>
        $xml .= "<n i='id' c='0'>";

        //<n i='id' c='collection_id' k1='pagoda'>
        foreach($collection as $pk => $array)
        {
            $xml .= sprintf("<n i='%d' c='%s' k1='%s'>\r\n", $map[$pk], $pk, $collection[$pk]['name']);

            foreach($array['sub'] as $obj)
            {
                $xml .= sprintf("<n i='%d' c='%s' k1='%s'/>\r\n", $map[$obj->pk()], $obj->pk(), $obj->nick);
            }

            $xml .= "</n>\r\n";
        }
        //</n></n></browser>
        $xml .= "</n></browser>";

        Core::cache($cache_key, $xml, 86400, false);

        return $xml;
    }

    public function action_suggest()
    {
        $type = Arr::get($_GET, 's', 'user');
        $version = Arr::get($_GET, 'version');

        $this->init_view('suggest', $type);
    }
}
