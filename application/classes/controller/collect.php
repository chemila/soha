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
    
    ###########################################################################################################################
    #
    # 以下 是采集 微博信息
    #
    ###########################################################################################################################
     /*
     * sina weibo config
     */
    public $domain_img_link = "http://www.sina.com.cn/";
    public $weibo_sina_username = "kaliy_2011_2@sina.com";
    public $weibo_sina_password = "1qaz1qaz";
    public $weibo_sina_uid = "2125854971";
    public $weibo_sina_homepage = "http://t.sina.com.cn/2125854971";
    public $weibo_sina_cookie = 'UOR=login,weibo.com,; SINAGLOBAL=3255968564907.3667.1303372292106; ULV=1305200463543:7:4:3:6790693872067.658.1305200463535:1305079837156; un=kaliy_2011_2@sina.com; NSC_wjq_xfjcp.dpn_ipnfqbhf=ffffffff0941136845525d5f4f58455e445a4a423660; _s_tentry=login.sina.com.cn; Apache=6790693872067.658.1305200463535; uc=a5%7Ck4%7C13e; WNP=2125191397%2C123; WNP1=2125191397%2C123; SinaRot//=76; SUE=es%3D010335a02f2c4407e0f656077d8c98c2%26es2%3D1d8d88d6d90028b5c887c36a695b2fe2%26ev%3Dv1; SUP=cv%3D1%26bt%3D1305204547%26et%3D1305290947%26uid%3D2125854971%26user%3Dkaliy_2011_2.%252A%252A%26ag%3D9%26email%3Dkaliy_2011_2%2540sina.com%26nick%3Dkaliy_2011_2%26name%3Dkaliy_2011_2%2540sina.com%26sex%3D%26dob%3D%26ps%3D0; ALF=1305809343; SSOLoginState=1305204547';
    public $weibo_sina_max_page = 500;
    
    
    /*
     * qq weibo config
     */
    public $weibo_qq_homepage = "http://t.qq.com";
    public $weibo_qq_cookie = "pt2gguin=o0083882066; pgv_pvid=478306300; pgv_r_cookie=1131628527355; o_cookie=83882066; pgv_flv=10.2%20r152; ptcz=1fd9aceda80011408f652674dc241f51e7540a1ae9676d4520cdaeac9cf43a2a; AREACODE=1|11|; PCCOOKIE=c2242036331d4d4e4fff03186e9a5e388a3a23a7c1565eb074010aff4c09d8b0; PCCOOKIE2=3283492455; ptui_width=370; ptui_height=142; pgv_info=ssid=s2656604432; ptisp=cnc; upFaceTip=1; mbCardUserNotLoginTips=1; uin=o0083882066; skey=@QMgZz3igI; luin=o0083882066; lskey=00010000227a4bf4b847d00a5e9ff5bf8cf16f7003fba760e5da37e5c46c76fee12b637b860d2d478d31e210; mb_reg_from=21";
	public $weibo_qq_max_page = 30;
	
	function get_items($string, $start=array(), $end=array()) {
		if(empty($string)) return array();
		
        $item_result = array(); 

        preg_match_all('#'.$start[0].'(.*?)'.$end[0].'#is', $string, $item);
        $item_result = $item[1];

        if(count($start)==2) {
                $item_result_arr = array();
                if(count($item_result)>1){
                        foreach ($item_result as $key => $value){
                        		if(!empty($value)){
                                	preg_match_all('#'.$start[1].'(.*?)'.$end[1].'#is', $value, $items);
                                	$item_result_arr[] = $items[1][0];
                        		}
                        }
                } else {
                		if(!empty($item_result[0])) {
                        	preg_match_all('#'.$start[1].'(.*?)'.$end[1].'#is', $item_result[0], $items);
                        	$item_result_arr[] = $items[1];
                		}
                }

                 $item_result = $item_result_arr;
        }

        return $item_result;
	}
	
	public function action_html_content($url, $post_data='', $cookie='', $refer='')
	{
		 $ch = curl_init();
		 curl_setopt($ch, CURLOPT_URL, $url);
         curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
         
         if(!empty($cookie)) curl_setopt($ch, CURLOPT_COOKIE, $cookie);
         if(!empty($post_data)) curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
         if(!empty($refer)) curl_setopt($ch, CURLOPT_REFERER, $refer);
         
         $response = curl_exec($ch);
         curl_close($ch);
         
         return $response;
	}
	
	/*
	 * 0  终止程序
	 * 1 继续执行程序
	 * 
	 * 如果 提交的数据 返回 为 0 则没有数据或服务器端链接不上  退出程序
	 */
	public function action_sinaweibo()
	{		 
		 set_time_limit(0);
		 
		 /*
		  * 获取 登陆成功的 cookie
		  */
/*		 $ch = curl_init();
		 curl_setopt($ch, CURLOPT_URL, "https://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.3.11)");
         curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
         curl_setopt($ch, CURLOPT_POST, 1);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
         curl_setopt($ch, CURLOPT_POSTFIELDS, "callback=parent.sinaSSOController.loginCallBack&client=ssologin.js(v1.3.11)&encoding=GB2312&entry=sso&from=&gateway=1&password=".$this->weibo_sina_password."&returntype=IFRAME&savestate=0&service=sso&setdomain=1&username=".$this->weibo_sina_username."&useticket=0");
         curl_setopt($ch, CURLOPT_HEADER, 1);
         $return = curl_exec($ch);
         curl_close($ch);
         
         $cookie = array();
	     $cookie = $this->get_items($return, array('Set-Cookie:'), array("\n"));
	     $cookie_str = '';
         for ($i=0;$i<count($cookie);$i++){
		 	$cookie_str .= trim($cookie[$i]).";";
         }*/
		 
//		 $post_data = "callback=parent.sinaSSOController.loginCallBack&client=ssologin.js(v1.3.11)&encoding=GB2312&entry=sso&from=&gateway=1&password=".$this->weibo_sina_password."&returntype=IFRAME&savestate=0&service=sso&setdomain=1&username=".$this->weibo_sina_username."&useticket=0";
//		 $response = $this->action_html_content("https://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.3.11)", $post_data);
//	     $cookie = array();
//	     $cookie = $this->get_items($response, array('Set-Cookie:'), array("\n"));
//	     $cookie_str = '';
//         for ($i=0;$i<count($cookie);$i++){
//		 	$cookie_str .= trim($cookie[$i]).";";
//         }

		 $cookie_str = $this->weibo_sina_cookie;
		 
         /*
          * 获取首页的 博客信息
          */
         
         $response = $this->action_html_content($this->weibo_sina_homepage, '', $cookie_str);
         $query_result = $this->parse_sina_html($response);
         if(empty($query_result)) exit();
         
         /*
          * 得到 首页的 第2屏数据
          */
         
         $first_page_lastid = $this->get_items($response, array('scope.\$lastid', '"'), array(';', '"'));
         $response = $this->action_html_content("http://t.sina.com.cn/mblog/aj_feed_myprofile.php?before=".$first_page_lastid[0][0]."&count=15", '', $cookie_str);
         
         $responseObj = json_decode($response);
		 $response = '<div id="feed_list">'.$responseObj->data->html."</div>";
		 
         $query_result = $this->parse_sina_html($response);
         if(empty($query_result)) exit();
         
         
         /*
          * 得到 首页的 第3屏数据
          */		 
         $response = $this->action_html_content("http://t.sina.com.cn/mblog/aj_feed_myprofile.php?before=".$responseObj->data->endmid."&count=20", '', $cookie_str);
         $responseObj = json_decode($response);
		 $response = '<div id="feed_list">'.$responseObj->data->html."</div>";
         $query_result = $this->parse_sina_html($response);
         if(empty($query_result)) exit();
         
          /*
          * 得到  第2页 以后的数据  最大 10 页
          */
         $endmid = $responseObj->data->endmid;
         for ($i=1, $j=2; $i<$this->weibo_sina_max_page; $i++, $j++)
         {
         	$response = $this->action_html_content("http://t.sina.com.cn/myprofile.php?uid=".$this->weibo_sina_uid."&old_page=$i&page=$j&endmid=$endmid", '', $cookie_str);
         	
         	$query_result = $this->parse_sina_html($response);
         	if(empty($query_result)) exit();
         	
         	$endid_arr = $this->get_items($response, array('scope.\$lastid', '"'), array(';', '"'));
         	$endmid = $endid_arr[0][0];
         }
	}
	
	public function get_weibo_data_exist($weibo_id, $src='sina')
	{
			$data_exist = DB::query(Database::SELECT, "select id from pin_weibo_shadow where sid='$weibo_id' and src='$src' order by timeline desc limit 1;")
            ->execute()
            ->as_array();
            
            return ((empty($data_exist)?0:$data_exist[0]['id']));
	}
	
	/*
	 * input    html
	 * return   0 or 1
	 * 
	 * 0  没有要执行的程序
	 * 1  有要执行的程序 继续采集
	 * 
	 */
	public function action_parse_sina_html($response='')
	{
		$response = Arr::get($_POST, "response");
		
		if(!empty($response))
		{
			$response = base64_decode($response);
		}
		else 
		{
			exit();
		}
		
		/*
		 * 得到视频图片的名称 在获得 图片对象
		 */
		$vedio_img_url = "http://t.sina.com.cn/mblog/sinaurl_info.php?url=h4tVwv%2Ch42Xc8%2Chr7BkI&lang=zh";
		$vedio_all_name = $this->get_items($response, array('mt="video">http://t.cn/'), array('<img'));
		
		$vedio_all_name = array_unique($vedio_all_name);
		
		$vedio_all_str = implode(",", $vedio_all_name);
		
		if(!empty($vedio_all_str))
		{
			$vedio_all_json = json_decode(file_get_contents("http://t.sina.com.cn/mblog/sinaurl_info.php?url=".urlencode($vedio_all_str)."&lang=zh"));
			$vedio_all_obj = (array)$vedio_all_json->data;
		}
			
		$responseDom = phpQuery::newDocumentHTML($response);
		
		$list = phpQuery::pq($responseDom)->find('#feed_list li');
		
		if( !$list ) 
		{
			return 0;
		}
		
		$data = array();
		$data_image = array();
		$i = 0;
		if($list->size() >0)
		{
			foreach ($list as $li)
			{
				$li_content = phpQuery::pq($li)->html();
				$weibo_link = phpQuery::pq($li)->find('.MIB_feed_c .lf cite a')->attr("href");
				$weibo_id = substr($weibo_link, strrpos($weibo_link, "/")+1);
				
				$uid = phpQuery::pq($li)->find('.head_pic a')->attr("uid");
				
				/*
				 * 此微博 是否存在
				 */
//		        $weibo_data_exist = $this->get_weibo_data_exist($weibo_id);
//				
//				if($weibo_data_exist>0)	
//				{
//					continue;
//				}
				
				$data[$i]['sid'] = trim($weibo_id);
				$data[$i]['uid'] = $uid;
				
				$user_link = phpQuery::pq($li)->find(".MIB_feed_c p a")->attr("href");
				//$data[$i]['domain_name'] = trim(substr($user_link, strrpos($user_link, "/")+1));
				//$data[$i]['name'] = trim(phpQuery::pq($li)->find(".head_pic img:first")->attr("title"));
				
				$data[$i]['timeline'] = phpQuery::pq($li)->find('.MIB_feed_c .lf cite:first a strong')->attr("date");
				
				$forward_count = trim(phpQuery::pq($li)->find(".MIB_feed_c .feed_att .rt a:first strong:last")->text());
				$forward_count_arr = explode("(", $forward_count);
				$data[$i]['forward_count'] = (empty($comment_count_arr[0])?0:(int)$comment_count_arr[0]);
				$comment_count = trim(phpQuery::pq($li)->find(".MIB_feed_c .feed_att .rt a:last strong:last")->text());
				$comment_count_arr = explode("(", $comment_count);
				$data[$i]['comment_count'] = (empty($comment_count_arr[1])?0:(int)$comment_count_arr[1]);
	        	
				$data[$i]['content'] = trim(phpQuery::pq($li)->find(".MIB_feed_c .sms")->html());
				$data[$i]['content'] = substr($data[$i]['content'], strpos($data[$i]['content'], "：")+3);
				
				$face_img = $this->get_items($data[$i]['content'], array('<img '), array('>'));
			
				/*
				 * 处理内容里面的 表情图片
				 */
				for ($face_img_count=0;$face_img_count<count($face_img);$face_img_count++) 
				{
					if(strstr($face_img[$face_img_count], "dynamic-src") && strstr($face_img[$face_img_count], 'title=')) 
					{
						$face_img_name = $this->get_items($face_img[$face_img_count], array('title="'), array('"'));
						
						if(is_array($face_img_name[0])) { 
							$data[$i]['content'] = @str_replace("<img $face_img[$face_img_count]>", "[".$face_img_name[0][0]."]", $data[$i]['content']);
						} else if(!empty($face_img_name[0])){
							$data[$i]['content'] = @str_replace("<img $face_img[$face_img_count]>", "[".$face_img_name[0]."]", $data[$i]['content']);
						}
					}
				}
				
				/*
				 * 处理 发布的图片   只能得到 普通图片  得不到 视频图片   视频图片在 视频对象里面
				 */
				$content_image_str = '';
				$source_img_dom = phpQuery::pq($li)->find(".MIB_feed_c > .feed_preview .feed_img a:first")->html();
				
				if(trim($source_img_dom) != '')
				{
						$content_image_str = phpQuery::pq($source_img_dom)->attr("dynamic-src");
						
						if(empty($content_image_str))
						{
							$content_image_str = phpQuery::pq($source_img_dom)->attr("src");
						}
				}
				
				/*
				 * 来源
				 */
				//$data[$i]['from'] = trim(phpQuery::pq($li)->find(".MIB_feed_c .feed_att .lf cite:last")->text());
				
				/*
				 * 获取 视频
				 */
				$vedio_data = array();
				if(strtolower(phpQuery::pq($li)->find(".MIB_feed_c p a:last")->attr("mt")) == "video")
				{
					$vedio_link = phpQuery::pq($li)->find(".MIB_feed_c p a:last")->attr("href");
					
					$vedio_name = trim(substr($vedio_link, strrpos($vedio_link, "/")+1));
					
					$vedio_data = $vedio_all_obj[$vedio_name];
					$data_image[$i][] = $vedio_data->screen;
					$data_image[$i][] = $vedio_data->icon;
/*					$vedio_data->screen = $this->domain_link_replace($vedio_data->screen);
					$vedio_data->icon = $this->domain_link_replace($vedio_data->icon);*/
				}
				
				if(!empty($content_image_str) || count($vedio_data))
				{
					$data[$i]['media_data'] = serialize(array("image"=>array("src"=>$content_image_str), "vedio"=>$vedio_data));
				}
				
				
				/*
				 * 微博 类型
				 */
				if(empty($content_image_str) && count($vedio_data)<=0){
					$data[$i]['type'] = 0;
				} else if(!empty($content_image_str) && count($vedio_data)<=0) {
					$data[$i]['type'] = 0+1;
				} else if(empty($content_image_str) && count($vedio_data)>0){
					$data[$i]['type'] = 0+2;
				} else {
					$data[$i]['type'] = 0+1+2;
				}
				
				
				/*
				 * 以下为  转发原文 解析
				 */
				$original_image_str = '';
				if(phpQuery::pq($li)->find(".MIB_feed_c > .MIB_assign")->html() != '')
				{
					$data[$i]['source']['content'] = trim(phpQuery::pq($li)->find(".MIB_feed_c .MIB_assign .MIB_assign_c > p")->html());
					
					$content_image_dom = trim(phpQuery::pq($li)->find(".MIB_feed_c .MIB_assign .MIB_assign_c .feed_preview > .feed_img")->html());
					
					if($content_image_dom != '')
					{
						foreach (phpQuery::pq($content_image_dom) as $img_val)
						{
							$original_image_str = phpQuery::pq($img_val)->find("img")->attr("dynamic-src");
							//$original_image_str = str_replace("/thumbnail/", "/bmiddle/", $original_image_str);
							if(empty($original_image_str))
							{
								$original_image_str = phpQuery::pq($img_val)->find("img")->attr("src");
								//$original_image_str = str_replace("/thumbnail/", "/bmiddle/", $original_image_str);
							}
							$data_image[$i][] = $original_image_str;
						}
					}
					
					$data[$i]['source']['sid'] = phpQuery::pq($li)->find(".MIB_feed_c .MIB_assign .MIB_assign_c p .source_att a:first")->attr("href");
					if( !empty($data[$i]['source']['sid']) )
					{
						$data[$i]['source']['sid'] = substr($data[$i]['source']['sid'], strrpos($data[$i]['source']['sid'], "/")+1);
					}
					$data[$i]['source']['src'] = "sina";
					
					/*
					 * 获取 视频
					 */
					$vedio_data = array();
					$original_vedio_dom = phpQuery::pq($li)->find(".MIB_feed_c .MIB_assign .MIB_assign_c p a");
					
					foreach ($original_vedio_dom as $original_vedio_val)
					{
						if(strtolower(phpQuery::pq($original_vedio_val)->attr("mt")) == "video")
						{
							$vedio_link = phpQuery::pq($original_vedio_val)->attr("href");
						
							$vedio_name = trim(substr($vedio_link, strrpos($vedio_link, "/")+1));
						
							$vedio_data = $vedio_all_obj[$vedio_name];
							$data_image[$i][] = $vedio_data->screen;
							
							$data_image[$i][] = $vedio_data->icon;
/*							$vedio_data->screen = $this->domain_link_replace($vedio_data->screen);
							$vedio_data->icon = $this->domain_link_replace($vedio_data->icon);*/
						}
					}
				
					if( !empty($original_image_str) || count($vedio_data) )
					{
						$data[$i]['source']['media_data'] = serialize((array("image"=>array("src"=>$original_image_str), "vedio"=>$vedio_data)));
					}
					
					$data[$i]['source']['content'] = substr($data[$i]['source']['content'], strpos($data[$i]['source']['content'], "：")+3);
					$data[$i]['source']['content'] = ((empty($data[$i]['source']['content']))?"":preg_replace('#<span class="source_att MIB_linkbl">(.*?)</a></span>#s', "", $data[$i]['source']['content']));
					/*
					 * 视频 图片
					 */
					if(empty($original_image_str) && count($vedio_data)<=0){
						$data[$i]['source']['type'] = 0;
					} else if(!empty($original_image_str) && count($vedio_data)<=0) {
						$data[$i]['source']['type'] = 0+1;
					} else if(empty($original_image_str) && count($vedio_data)>0){
						$data[$i]['source']['type'] = 0+2;
					} else {
						$data[$i]['source']['type'] = 0+1+2;
					}
				}
				
				$data[$i]['src'] = 'sina';
				$data[$i]['created_at'] = time();

				$i ++;
			}
		}
		
    	echo "<pre>";
		print_R($data);
		print_R($data_image);
		echo "</pre>";
		
		if(count($data)>0) 
		{
			$this->insert_weibo_data($data, $data_image, "sina");
			//return 1;
			echo 1;
		}
		else 
		{
			//return 0;
			echo 0;
		}
	}
	
	
	public function insert_weibo_data($data, $data_image, $src)
	{
		$model = new Model_Collect_Weibo();
		//$model_image = new Model_Collect_Image();

		if(count($data)>0) 
		{
			foreach ($data as $i => $data_value)
			{
				/*
				 * is root
				 */
				if( !empty($data_value['source']['content']) )
				{
					$db_result = $model->insert($data_value['source']);
					if($db_result instanceof Database_Exception)
					{
						if( strstr($db_result->__toString(), "for key 'uidx_ss'") )
						{
							$rid = $this->get_weibo_data_exist($data_value['sid']);
						}
					}
					else
					{
						$rid = $db_result[0];
					}
				}

				unset($data_value['source']);
				$data_value['rid'] = $rid;
				$data_value['method'] = 1;
				$db_result = $model->insert($data_value);
				
				die("ksadjflasdjf");
				/*
				 * 把 图片链接 写入数据库
				 */
				/*
				if($db_result[1] ==1)
				{
					$insert_id = $db_result[0];
					
					$data_img = array();
					if(!empty($data_image[$i]) && count($data_image[$i])>0)
					{
						for ($j=0;$j<count($data_image[$i]);$j++)
						{
							if(!empty($data_image[$i][$j]))
							{
								$data_img['image_url'] = trim($data_image[$i][$j]);
								$data_img['pin_collect_weibo_id'] = $insert_id;
								$data_img['image_src'] = $src;
								$model_image->insert($data_img);
							}
						}
					}
				}
				*/
			}
		}
	}
	
	/*
	 * insert response html
	 *  
	 * return array(最后一条微博ID, 最后一条微博时间)
	 */
	public function parse_qq_html($response='')
	{
		$responseDom = phpQuery::newDocumentHTML($response);
		
		$list = phpQuery::pq($responseDom)->find('#talkList li');
		
		if( !$list ) 
		{
			return 0;
		}
		
		$data = array();
		$data_image = array();
		$i = 0;
		if($list->size() >0)
		{
			foreach ($list as $li)
			{
				$li_content = phpQuery::pq($li)->html();
				$weibo_id = phpQuery::pq($li)->attr('id');
				
				$user_link = phpQuery::pq($li)->find(".msgBox .userName a:first")->attr("href");
				$domain_name = trim(substr($user_link, strrpos($user_link, "/")+1));
				
				/*
			 	* 此微博 是否存在
			 	*/
	        	$weibo_data_exist = $this->get_weibo_data_exist($weibo_id, $domain_name, 1);
				if($weibo_data_exist>0)
				{
					continue;
				}
				
				$data[$i]['forward_count'] = trim(phpQuery::pq($li)->find(".pubInfo .funBox a:first")->attr("num"));
				$data[$i]['comment_count'] = trim(phpQuery::pq($li)->find(".pubInfo .funBox a:odd")->attr("num"));
	        	
	        	$data[$i]['weibo_id'] = $weibo_id;
				$data[$i]['timeline'] = phpQuery::pq($li)->attr('rel');
	
				
				$data[$i]['domain_name'] = $domain_name;
				$data[$i]['uid'] = $domain_name;
				$data[$i]['name'] = trim(phpQuery::pq($li)->find(" > .msgBox .userName a")->attr("title"));
				if(!empty($data[$i]['name']))
				{
					$data[$i]['name'] = trim(substr($data[$i]['name'], 0, strrpos($data[$i]['name'], "(")));
				}
				
				$data[$i]['content'] = trim(phpQuery::pq($li)->find(" >.msgBox >.msgCnt")->html());
				
				/*
				 * 内容里面的 表情 处理
				 */
				if(!empty($data[$i]['content']) && strstr($data[$i]['content'], 'crs="'))
				{
					$content_face_image = $this->get_items($data[$i]['content'], array('title="'), array('"'));
					$data[$i]['content'] = preg_replace("#<img(.*?)>#i", "", $data[$i]['content']);
					for ($j=0; $j<count($content_face_image); $j++)
					{
						$data[$i]['content'] .= "[".$content_face_image[$j]."]";
					}
				}
				
				$content_image_str = trim(phpQuery::pq($li)->find("> .msgBox .mediaWrap .picBox:first a")->attr("href"));
				$content_image_str = $data_image[$i][] = (empty($content_image_str)?"":$content_image_str.".jpg");
				
				/*
				 * 来源
				 */
				$from = trim(phpQuery::pq($li)->find(".msgBox .pubInfo:last .left .f")->text());
				$from = str_replace("来自", "", $from);
				$data[$i]['from'] = (empty($from)?"网页":$from);
				
				/*
				 * 获取 视频
				 */
				$vedio_data = array();
				if(phpQuery::pq($li)->find("> .msgBox .mediaWrap .videoBox")->size()>0)
				{
					if(!empty($vedio_data['minipicurl'])) $data_image[$i][] = (empty($vedio_data['minipicurl'])?"":$vedio_data['minipicurl']);
					
					$vedio_data['reltitle'] = phpQuery::pq($li)->find("> .msgBox .mediaWrap .videoBox")->attr("reltitle");
					$vedio_data['minipicurl'] = phpQuery::pq($li)->find("> .msgBox .mediaWrap .videoBox")->attr("minipicurl");
					$vedio_data['playurl'] = phpQuery::pq($li)->find("> .msgBox .mediaWrap .videoBox")->attr("playurl");
					$vedio_data['shorturl'] = phpQuery::pq($li)->find("> .msgBox .mediaWrap .videoBox")->attr("shorturl");
					$vedio_data['realurl'] = phpQuery::pq($li)->find("> .msgBox .mediaWrap .videoBox")->attr("realurl");
				}
				
				$data[$i]['media_data'] = serialize(array("image"=>array("src"=>$content_image_str), "vedio"=>$vedio_data));
				
	
				/*
				 * 
				 */
				if(empty($content_image_str) && phpQuery::pq($li)->find("> .msgBox .mediaWrap .videoBox")->size()<=0)
				{
					$data[$i]['type'] = 0;
				}
				else if(!empty($content_image_str) && phpQuery::pq($li)->find("> .msgBox .videoBox")->size()<=0)
				{
					$data[$i]['type'] = 0+1;
				}
				else if(empty($content_image_str) && phpQuery::pq($li)->find("> .msgBox .videoBox")->size()>0)
				{
					$data[$i]['type'] = 0+2;
				}
				else 
				{
					$data[$i]['type'] = 0+1+2;
				}
				
				/*
				 * 以下为  转发原文 解析
				 */
				$data[$i]['original_content'] = trim(phpQuery::pq($li)->find(".replyBox .msgBox .msgCnt")->html());
				
				$original_content_image = trim(phpQuery::pq($li)->find(".replyBox .msgBox .picBox a")->attr("href"));
				$original_content_image = $data_image[$i][] = (empty($original_content_image)?"":$original_content_image);
				
				
				/*
				 * 获取 视频
				 */
				$vedio_data = array();
				if(phpQuery::pq($li)->find("> .msgBox .replyBox .mediaWrap .videoBox")->size()>0)
				{
					if(!empty($vedio_data['minipicurl'])) $data_image[$i][] = (empty($vedio_data['minipicurl'])?"":$vedio_data['minipicurl']);
					
					$vedio_data['reltitle'] = phpQuery::pq($li)->find("> .msgBox .replyBox .mediaWrap .videoBox")->attr("reltitle");
					$vedio_data['minipicurl'] = phpQuery::pq($li)->find("> .msgBox .replyBox .mediaWrap .videoBox")->attr("minipicurl");
					$vedio_data['playurl'] = phpQuery::pq($li)->find("> .msgBox .replyBox .mediaWrap .videoBox")->attr("playurl");
					$vedio_data['shorturl'] = phpQuery::pq($li)->find("> .msgBox .replyBox .mediaWrap .videoBox")->attr("shorturl");
					$vedio_data['realurl'] = phpQuery::pq($li)->find("> .msgBox .replyBox .mediaWrap .videoBox")->attr("realurl");
				}
				
				$data[$i]['original_media_data'] = serialize((array("image"=>array("src"=>$original_content_image, 'qq'), "vedio"=>$vedio_data)));
				
				/*
				 * 视频 图片
				 */
				if(empty($original_content_image) && phpQuery::pq($li)->find(".replyBox .mediaWrap")->size()<=0)
				{
					$data[$i]['original_type'] = 0;
				}
				else if(!empty($original_content_image) && phpQuery::pq($li)->find(".replyBox .mediaWrap")->size()<=0)
				{
					$data[$i]['original_type'] = 0+1;
				}
				else if(empty($original_content_image) && phpQuery::pq($li)->find(".replyBox .mediaWrap")->size()>0)
				{
					$data[$i]['original_type'] = 0+2;
				}
				else 
				{
					$data[$i]['original_type'] = 0+1+2;
				}
				
				
				$data[$i]['src'] = 1;
				$data[$i]['created_at'] = time();
				
				$i ++;
			}
		}
		
/*		echo "<pre>";
		print_R($data);
		echo "</pre>";*/

		if(count($data)>0) 
		{
			$this->insert_weibo_data($data, $data_image, "qq");
			return array($data[$i-1]['weibo_id'], $data[$i-1]['timeline']);
		}
		else 
		{
			return array();
		}
	}
	###########################################################################################################################
} // End Welcome
