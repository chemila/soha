<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Data extends Controller_Base {

    public function action_index()
    {
        $type = Arr::get($_GET, 's', 'user');
        $query = Arr::get($_GET, 'q', false);
        $version = Arr::get($_GET, 'version', '0');

        call_user_func_array(array($this, $type.'_swirl'), array(
            'id' => $version, 
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
            $users = $user->where('portrait', '!=', '')
                ->limit(20)
                ->order_by('fans_count', 'desc')
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

    protected function weibo_swirl($id = NULL, $query = NULL)
    {
        $this->init_view('swirl', 'weibo');
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
            if( ! $item->portrait) 
            {
                $item->portrait = '/media/img/portrait/default_180.gif';
            }

            $url = $this->fix_portrait($item->portrait, $item->source, 180);
            $xml .= sprintf("<i i='%d' e='%s' h='%s' c='%s' d='%d %d' s='%s' l='%s'/>",
                $i, $url, $item->source, $item->nick.' '.Text::limit_chars($item->location, 20),
                180, 180, $item->portrait, 'user/show/'.$item->pk());
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

    protected function fix_portrait($url, $source = NULL, $size = 180)
    {
        if( ! $source)
        {
            return $url;
        }
    
        $url_info = parse_url($url);

        if('sina' == $source)
        {
            return preg_replace('~http://(\w+)\.sinaimg\.cn/(\w+)/\d+/(\w+)/(\d+)/?$~i', 
                    'http://\\1.sinaimg.cn/\\2/'.$size.'/\\3/\\4', $url);
        }
        if('qq' == $source)
        {
            return rtrim($url, '/').'/'.$size;
        }
        if('sohu' == $source and strpos($url_info['host'], "cr.itc.cn"))
        {
            if(50 != $size)
            {
                return preg_replace('~http://(\w+)\.(\w+)\.itc\.cn/(\w+)/(\w+)/(\w+)/(\w+)/m_(\w+)~i',
                    'http://\\1.\\2.itc.cn/\\3/\\4/\\5/\\6/\\7', $url);
            }
            return $url;
        }
        //http://oimagec1.ydstatic.com/image?w=48&h=48&url=http%3A%2F%2F126.fm%2F2y8Xi5
        //elseif(preg_match('~^http://\w+\.ydstatic\.com~', $url, $match))
        if('sohu' == $source and strpos($url_info['host'], "ydstatic.com"))
        {
            if($size == 50)
            {
                $query = $url_info['query'];
            }
            else 
            {
                $size = $map['large'];
                $query = str_replace("=48", "=$size", $url_info['query']);
            }
            return $url_info['scheme']."://".$url_info['host']."".$url_info['path']."?".$query;
        }
    }
}
