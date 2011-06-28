<?php defined('SYSPATH') or die('No direct script access.');

class Controller_User extends Controller_Authenticated {

    public function action_index()
    {

    }

    public function action_relationship()
    {
        $fans = $this->user->fans->find_all();
        $followers = $this->user->followers->find_all();
        $json = array();

        foreach($fans as $value)
        {
            $user = new Model_User($value->fuid);
            $json[] = array(
                'uid' => $user->pk(),
                'nick' => $user->nick,
                'intro' => $user->intro,
                'fuid' => $this->user->nick,
            );
        }

        foreach($followers as $value)
        {
            $user = new Model_User($value->uid);
            $json[] = array(
                'uid' => $this->user->pk(),
                'nick' => $this->user->nick,
                'intro' => $this->user->intro,
                'fuid' => $user->nick,
            );
        }

        $this->init_view();
        $this->view->json = json_encode($json);
    }

    protected function str2bytes($in)
    {
        $hex_ary = array();
        foreach (str_split($in) as $chr) 
            $hex_ary[] = sprintf("%02X", ord($chr));

        return implode(' ',$hex_ary);
    }

    public function action_rel_data()
    {
        //$data = file_get_contents('http://tag.soso.com/i/getRelData.php?kw=');
        //$test = gzuncompress($data);
        $test = <<<DATA
布林    伊曼纽尔    0   88.4227743218732    冠军
布林    莱克曼  0   29.5995355323447    对手
布林    连阳    0   14.2266977176416    回调,强势地位
布林    艾曼纽尔    0   13.1820575300121    实现逆转,冠军
布林    施密特  0   8.9776486804641 三驾马车,平易近人
布林    福斯特  0   6.55657810101745    十分出色,取得领先
布林    张论金  0   5.84801456606595    出现粘合,受到支撑
布林    乔布斯  2   4.98031330731143    我行我素,信任
布林    科尔曼  2   3.41126550855956    力克,冠军
布林    帕特尼奥    2   3.29551438250302    得分最高
连阳    周线三  0   4.3487      突破,再试高位
施密特  eric    0   11.6093     放弃,攻击
DATA;
        die(($test));
    }

    public function action_random()
    {
        return '刘翔 孙海平 0 1215.45 接近复出,准备复出,就像豆腐渣,还有问题
            麦迪 韩寒 1 0.001 冰冻三尺
            冯树勇 纪伟 1 0.001 潜力选手,接班';
    }

    public function action_portrait()
    {
        return 'media/img/404.png';
    }

    public function action_news()
    {
        
    }
}
