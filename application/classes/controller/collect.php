<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Collect extends Controller {
    const BASE_URL =  'http://query.yahooapis.com/v1/public/yql';

	public function action_index()
	{
		$this->request->response = 'hey u!';
	}

    public function action_run()
    {
        set_time_limit(0);
        $count = 0;

        foreach(kohana::config('collect') as $src => $setting)
        {
            for($i = 1; $i <= $setting['max']; $i ++)
            {
                $url = strtr($setting['url'], array(':page' => $i));
                $yql_query = "select * from html where url='{$url}' and xpath='{$setting['xpath']}'";
                $yql_query_url = self::BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";
                //http://query.yahooapis.com/v1/public/yql?q=select * from html where url="http://service.t.sina.com.cn/pub/top/starfans" and xpath='//li[@class="list"]'&format=json
                $response = file_get_contents($yql_query_url);

                if( ! $response) 
                    break;

                $data = json_decode($response, true);
                $count += $this->parse_data($data, $src);
            }
        }

        $this->request->response = 'count: '. $count;
    }

    private function parse_data($data, $src)
    {
        if( ! $data['query']['count'])
            return false;

        $result = array();
        $tag = kohana::config('collect.' . $src . '.tag');
        $items = $data['query']['results'][$tag];
        $model = new Model_Collect;
        $count = 0;

        foreach($items as $item)
        {
            switch($src)
            {
                case 'sina':
                    $result['url'] = $item['div'][2]['a']['href'];
                    $result['nick'] = $item['div'][2]['a']['content'];
                    $result['uid'] = trim(parse_url($result['url'], PHP_URL_PATH), '/'); 
                    $result['src'] = $src;
                    $result['rank'] = $item['div'][4]['p'];
                    $result['info'] = $item['div'][3]['p'];
                    break;
                case 'tenx':
                    var_dump($item);die;
                default:
                    break;
            }
            
            try
            {
                $model->insert($result);
                $count ++;
            }
            catch(Exception $e)
            {
                continue;
            }
        }

        return $count;
    }

    public function fetch_sohu()
    {
    }
} // End Welcome


