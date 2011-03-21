<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Collect extends Controller {
    const BASE_URL =  'http://query.yahooapis.com/v1/public/yql';

	public function action_index()
	{
		$this->request->response = 'hey u!';
	}

    public function action_yql()
    {
        set_time_limit(0);
        $count = 0;

        foreach(Core::config('yql') as $src => $setting)
        {
            for($i = 1; $i <= $setting['max']; $i ++)
            {
                $url = strtr($setting['url'], array(':page' => $i));
                $yql_query = "select * from html where url='{$url}' and xpath='{$setting['xpath']}'";
                $yql_query_url = self::BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";
                $response = file_get_contents($yql_query_url);

                if( ! $response) 
                    break;

                $data = json_decode($response, true);

                if(empty($data) or 0 == $data['query']['count'])
                    break;

                $count += $this->parse_data($data, $src);
            }
        }

        $this->request->response = 'count: '. $count;
    }

    public function action_query_qq()
    {
        $snoopy = new Snoopy();
        $snoopy->rawheaders['Cookie'] = 'gv_pvid=6481536790; pgv_flv=10.0; pgv_r_cookie=113688660328; o_cookie=628555; pt2gguin=o1951067666; showModel=list; FTN5K=5ee9f8b1; uin_cookie=628555; euin_cookie=07B7B4346EB082C55A27AABA958215C691B2014D22BCF1EE; ptui_qstatus=1; pgv_info=ssid=s2087519082; uin=o1951067666; skey=@A7a9VrBWz; ptisp=cnc; luin=o1951067666; lskey=00010000500c3f8a806be49951162e34720ac01a5a627f86075a1095197b7cea6c32ad8d1c9d8416f4d2e997; mb_reg_from=8; ptui_loginuin2=cnxuda@gmail.com';

        if( ! $snoopy->fetch('http://t.qq.com/p/rank')) {
            die('cant access');
        }

        $document = phpQuery::newDocumentHTML($snoopy->results);
        $this->parse_qq_top($document);
    }

    public function action_query_qq_all()
    {
        $snoopy = new Snoopy();
        $snoopy->rawheaders['Cookie'] = 'gv_pvid=6481536790; pgv_flv=10.0; pgv_r_cookie=113688660328; o_cookie=628555; pt2gguin=o1951067666; showModel=list; FTN5K=5ee9f8b1; uin_cookie=628555; euin_cookie=07B7B4346EB082C55A27AABA958215C691B2014D22BCF1EE; ptui_qstatus=1; pgv_info=ssid=s2087519082; uin=o1951067666; skey=@A7a9VrBWz; ptisp=cnc; luin=o1951067666; lskey=00010000500c3f8a806be49951162e34720ac01a5a627f86075a1095197b7cea6c32ad8d1c9d8416f4d2e997; mb_reg_from=8; ptui_loginuin2=cnxuda@gmail.com';

        foreach(array(101, 102, 104, 105, 106, 110, 288,) as $i) {
            if( ! $snoopy->fetch('http://t.qq.com/people?more='.$i)) {
                continue;
            }

            $document = phpQuery::newDocumentHTML($snoopy->results);
            $this->parse_qq($document, $i);
        }
    }

    public function action_query_sohu()
    {
        $categories = array(
            1102 => '影视明星', 1103 => '歌手', 1105 => '导演编剧', 1109 => '主持人', 1934 => '曲艺',
            1114 => '娱乐记者', 1110 => '娱评人', 1107 => '网络红人', 1104 => '音乐人', 1113 => '乐评人',
            1112 => '影人', 1126 => '影视剧', 1122 => '公司机构', 1121 => '电视栏目', 1116 => '娱乐媒体',
            1222 => '娱乐主编', 1120 => '电视媒体',
        );

        $snoopy = new Snoopy();

        for($i = 1; $i <= 10; $i ++) {
            foreach($categories as $cid => $category) {
                $url =sprintf('http://t.sohu.com/star/group.jsp?1=1&gid=%d&type=0&cid=525&next_cursor=0&pageNo=%d', $cid, $i); 
                if( ! $snoopy->fetch($url)) {
                    continue;
                }

                $document = phpQuery::newDocumentHTML($snoopy->results);
                $this->parse_sohu($document, $category);
            }
        }
    }

    private function parse_sohu($document, $category) {
        $lis = phpQuery::pq($document)->find('div[class="apc fanlist"] ul li[vid]');

        if( ! $lis) {
            return false;
        }

        $data = array();
        $model = new Model_Collect;

        foreach($lis as $li) {
            $data['uid'] = phpQuery::pq($li)->attr('vid');
            $data['url'] = phpQuery::pq($li)->find('b[class="nm"]>a')->attr('href');

            $host = parse_url($data['url'], PHP_URL_HOST);
            if(preg_match('/^([a-z0-9_]+).t.sohu.com$/', $host, $match)) {
                $data['name'] = $match[1];
            }

            $data['nick'] = iconv('gbk', 'utf-8', phpQuery::pq($li)->find('b[class="nm"]>a')->html());
            $data['src'] = 'sohu';
            $data['rank'] = phpQuery::pq($li)->find('div[class="col_fun"]')->html();
            $data['info'] = phpQuery::pq($li)->find('b[class="nm"]>i')->attr('title');
            $data['category'] = $category;
            
            try
            {
                $model->insert($data);
            }
            catch(Exception $e) {}
        }
    }

    private function parse_data($data, $src)
    {
        if( ! $data['query']['count'])
            return false;

        $result = array();
        $tag = Core::config('yql.' . $src . '.tag');
        $items = $data['query']['results'][$tag];
        $model = new Model_Collect;
        $count = 0;

        foreach($items as $item)
        {
            switch($src)
            {
                case 'sina_star':
                case 'sina_grass':
                    $result['url'] = $item['div'][2]['a']['href'];
                    $result['nick'] = $item['div'][2]['a']['content'];
                    $result['uid'] = trim(parse_url($result['url'], PHP_URL_PATH), '/'); 
                    $result['name'] = $result['uid'];
                    $result['src'] = $src;
                    $result['rank'] = $item['div'][4]['p'];
                    $result['info'] = @$item['div'][3]['p'];
                    $result['category'] = @Core::config('yql.'.$src.'.category') or '明星';
                    
                    break;
                default:
                    break;
            }

            if( ! $result['uid'])
            {
                break;
            }
            
            try
            {
                $model->insert($result);
                $count ++;
            }
            catch(Exception $e) { }
        }

        return $count;
    }

    private function parse_tenx($browser) {
        $trs = $browser->find('table tr:gt(0)');
        
        if( ! $trs)
            return false;

        $data = array();
        echo (count($trs)) . "<br>";
        return;

        foreach($trs as $tr) {
            $data['uid'] = pq($tr)->find('td:eq(1) a:eq(1)')->text();
            $data['nick'] = iconv('gbk', 'utf-8', pq($tr)->find('td:eq(2) a:eq(0) font')->html());
            $data['src'] = 'tenx';
            $data['rank'] = (int)pq($tr)->find('td:eq(4)')->text();
            $data['place'] = pq($tr)->find('td:eq(7) a')->text();
            $data['url'] = pq($tr)->find('td:eq(8) a')->attr('href');

            db_insert($data);
        }
    }

    private function parse_qq($document, $i) {
        $lis = phpQuery::pq($document)->find('li.mhover');

        if( ! $lis) return false;

        $data = array();
        $model = new Model_Collect;

        foreach($lis as $li) {
            $data['uid'] = trim(phpQuery::pq($li)->find('a:eq(1)')->attr('href'), '/');     
            $data['nick'] = phpQuery::pq($li)->find('a:eq(1)')->attr('title');     
            $data['name'] = $data['uid'];
            $data['url'] = 'http://t.qq.com/'.$data['uid'];
            $data['src'] = 'qq';
            $data['rank'] = 0;
            $data['category'] = ($i == 288) ? '草根' : '明星';

            try
            {
                $model->insert($data);
            }
            catch(Exception $e) {}
        }
    }

    private function parse_qq_top($document) {
        $lis = phpQuery::pq($document)->find('div.topListBox ol li');

        if( ! $lis) return false;

        $data = array();
        $model = new Model_Collect;
        $cnt = 0;

        foreach($lis as $li) {
            $cnt ++;

            $data['uid'] = trim(phpQuery::pq($li)->find('span.userName a')->attr('href'), '/');     
            $data['nick'] = phpQuery::pq($li)->find('span.userName a')->text();     
            $data['name'] = $data['uid'];
            $data['url'] = 'http://t.qq.com/'.$data['uid'];
            $data['src'] = 'qq';
            $data['rank'] = phpQuery::pq($li)->find('span.topData')->text();
            $data['category'] = $cnt > 50 ? '草根' : '明星';

            try
            {
                $model->insert($data);
            }
            catch(Exception $e) {}
        }
    }
} // End Welcome
