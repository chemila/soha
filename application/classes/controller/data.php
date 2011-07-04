<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Data extends Controller_Base {
    public function before()
    {
        if( ! Arr::get($_SERVER, 'HTTP_REFERER', false) or  
            ! stripos(@$_SERVER['HTTP_REFERER'], 'media/swf/clusterBrowser.swf'))
        {
            $this->trigger_error();
        }
    }

    public function action_index()
    {
        $sid = Arr::get($_GET, 's', '0');
        $query = Arr::get($_GET, 'q', false);
        $version = Arr::get($_GET, 'version', 'user');

        call_user_func_array(array($this, $version.'_swirl'), array(
            'id' => $sid, 
            'query' => $query,
        ));
    }

    protected function user_swirl($id = NULL, $query = NULL)
    {
        $user = new model_user;
        if($query)
        {
            $users = $user->where('nick', 'like', '%'.$query.'%')->find_all(); 
            $this->cache_key = 'user_swirl_'.$query.'_'.date('Ymd');
        }
        elseif('0' !== $id)
        {
            $user->uid = $id;
            $this->cache_key = 'user_swirl_'.$id.'_'.date('Ymd');
            $users = $user->get_followers();
        }
        else
        {
            $this->cache_key = 'user_swirl_top'.date('Ymd');
            $users = $user->where('source', '=', 'sina')
                ->order_by('fans_count', 'desc')
                ->order_by('statuses_count', 'desc')
                ->limit(40)
                ->find_all();
        }

        $collection = array();
        foreach($users as $obj)
        {
            $all[] = $obj;

            $fs = $obj->get_fans();
            $collection[$obj->pk()]['name'] = $obj->nick;
            $collection[$obj->pk()]['sub'] = $fs;

            $all = array_merge($all, $fs);
        }
        
        $all = array_unique($all);
        die($this->to_xml($all, $collection));
    }

    protected function profile_swirl($id = NULL, $query = NULL)
    {
        //weibo
        //hot forwarded
        //hot commented
        //fans
        //followers
        $user = new Model_User($id);
        
        $fans = $user->get_fans();
        $followers = $user->get_followers();
        $feeds = $user->get_feeds();
    }

    protected function to_xml($items, $collection)
    {
        if(false and $cached = Core::cache($this->cache_key, NULL, NULL, false))
            return $cached;

        $xml = "<browser><l l='0'/><i i='0'/>";
        //<i i='id' e='thumb_url' h='host_name' c='caption split by x' d='width height' s='image_url' l='land_url '/>
        $i = 0;
        $map = array();
        foreach($items as $item)
        {
            $i ++;
            $map[$item->pk()] = $i;

            $url = $item->fix_portrait(180);
            $xml .= sprintf("<i i='%d' e='%s' h='%s' c='%s' d='%d %d' l='%s'/>", 
                $i, $url, $item->source, $item->nick.' '.Text::limit_chars($item->location, 20),
                180, 180, 'user/profile/'.$item->pk());
        }
        //<n i='id' c='0'>
        $xml .= "<n i='id' c='0'>";

        //<n i='id' c='collection_id' k1='pagoda'>
        foreach($collection as $pk => $array)
        {
            if(count($array['sub']))
            {
                $xml .= sprintf("<n i='%d' c='%s' k1='%s'>", $map[$pk], $pk, $collection[$pk]['name']);
                foreach($array['sub'] as $obj)
                {
                    $xml .= sprintf("<n i='%d' c='%s' k1='%s'/>", $map[$obj->pk()], $obj->pk(), $obj->nick);
                }
                $xml .= "</n>";
            }
            else
            {
                $xml .= sprintf("<n i='%d' c='%s' k1='%s'/>", $map[$pk], $pk, $collection[$pk]['name']);
            }
        }
        //</n></n></browser>
        $xml .= "</n></browser>";

        Core::cache($this->cache_key, $xml, 86400, false);
        return $xml;
    }

    public function action_suggest()
    {
        $name = Arr::get($_GET, 'q', false);
        $user = new Model_User;
        $result = $user->where('nick', 'like', '%'.$name.'%')
            ->limit(20)
            ->order_by('fans_count', 'desc')
            ->order_by('statuses_count', 'desc')
            ->find_all()
            ->as_array();

        $this->init_view('suggest', 'user');

        $this->view->users = $result;
        $this->view->query = $name;
    }

    public function action_test()
    {
        $this->user_swirl('1003324');
    }
}
