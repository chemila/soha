<?php defined('SYSPATH') OR die('No direct access allowed.');

return array
(
    'sina_star' => array(
        'url' => 'http://service.t.sina.com.cn/pub/top/starfans?&p=:page',
        'max' => 50,
        'limit' => 50,
        'xpath' => '//div[@class="ctfanList"]//li[@class="list"]',
        'tag' => 'li',
        'category' => '明星',
    ),
    'sina_grass' => array(
        'url' => 'http://t.sina.com.cn/pub/top/grass?t=0&p=:page',
        'max' => 39,
        'limit' => 50,
        'xpath' => '//div[@class="ctfanList"]//li[@class="list"]',
        'tag' => 'li',
        'category' => '草根',
    ),
    'tenx' => array(
        'url' => 'http://t.qq.com/people?more=101',
        'max' => 1,
        'limit' => null,
        'xpath' => '//li[@class="mhover"]',
        'tag' => 'li',
    ),
    'sohu' => array(
        'url' => 'http://t.sohu.com/star/group.jsp?1=1&gid=1102&type=0&cid=525&pageNo=:page&next_cursor=0',   
        'max' => 10,
        'limit' => null,
        'xpath' => '//div[@class="apc fanlist"]/ul/li'
    ),
);



