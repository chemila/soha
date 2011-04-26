<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Collect extends Controller_Admin {

    public function action_list()
    {
        set_time_limit(300);
        $type = arr::get($_GET, 'type', 1);
        $snoopy = new snoopy;

        if(1 == $type)
        {
            $page = 'http://service.t.sina.com.cn/pub/top/starfans?&p=:page';
        }
        elseif(4 == $type)
        {
            $page = 'http://weibo.com/pub/top/grass?t=0&&p=:page';
        }
        else
        {
            die('invalid type');
        }

        $model = Model_Collect::instance('list');

        for($i = 1; $i <= 40; $i ++)
        {
            $url = strtr($page, array(':page' => $i));

            $snoopy->fetch($url);
            if( ! $snoopy->results) 
                break;

            $document = phpQuery::newDocumentHTML($snoopy->results, 'utf-8');
            $lis = phpQuery::pq('div.ctfanList li.list', $document);
            $data = array();

            foreach($lis as $li)
            {
                $head_pic = phpQuery::pq('div.headpic img', $li)->attr('src'); 
                $tmp = parse_url($head_pic, PHP_URL_PATH);
                list($uid, $others) = explode('/', trim($tmp, '/'), 2); 
                unset($tmp, $others);
                $data['uid'] = $uid;
                $data['src'] = 'sina';
                $domain = phpQuery::pq('div.name a', $li)->attr('href');
                $data['url'] = $domain;
                $data['category'] = $type;
                $data['name'] = trim(parse_url($domain, PHP_URL_PATH), '/');
                $data['nick'] = phpQuery::pq('div.name', $li)->text();
                $data['rank'] = phpQuery::pq('div.fans', $li)->text();
                $data['info'] = phpQuery::pq('div.reason', $li)->text();

                $model->insert($data);
            }
        }
    }

    public function action_star()
    {
        set_time_limit(300);
        $model = Model_Collect::instance('list');
        $source = arr::get($_GET, 'source', false);

        if(!$source)
            die('input source first, like: sina, qq, sohu, 163');
        
        $total = $model->count_all();
        $perpage = 100;
        $output = 0;

        for($i = 1; $i <= ceil($total/$perpage); $i ++)
        {
            $rs = $model->all($i, $perpage, $source);
            
            if( ! $rs)
                break;

            foreach($rs as $record)
            {
                $user_info = $this->fetch_user($record);

                if( ! $user_info)
                    continue;

                $user = new Model_User;

                if( ! $uid = $user->check_exist($user_info['suid'], $user_info['source']))
                {
                    $uid = $user->create($user_info);
                }

                $star = new Model_Star($uid);

                if($star->insert_or_update($user_info))
                {
                    $output ++;
                    $model->mark($record['id']);
                }
            }
        }

        die($output);
    }


    /**
     * From collect_list data
     * TO user data
     */
    public function fetch_user($record)
    {
        $data = array();
        $source = $record['src'];
        $default = array(
            'category' => 1,
            'tag' => $record['category'],
        );

        $session = session::instance();

        $token = OAuth_Token::session_factory('access', $source);

        if( ! $token)
        {
            $this->request->redirect('/auth');
        }

        $oauth = new OAuth($source, $token);

        $model_oauth = Model_OAuth::factory($oauth);
        try
        {
            $user_info = $model_oauth->user_info(array('unique_id' => $record['uid']));
            sleep(4);
            
            if( ! $user_info)
                return false;

            return $default + $user_info;
        }
        catch(Exception $e)
        {
            return false;
        }
    }
} // End Welcome
