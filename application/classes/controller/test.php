<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller_Admin {
	public function action_index()
	{
		$this->trigger_error('错误的请求');
	}

    public function action_weibo_publish()
    {
        $count = Arr::get($_GET, 'count', 1);
        $weibo = new Model_Weibo();
        $weibo->pull($count, true);
    }

    public function action_weibo_queue()
    {
        $count = Arr::get($_GET, 'count', 1);
        $weibo_shadow = new Model_Collect_Weibo;
        $shadows = $weibo_shadow->todo($count);

        foreach($shadows as $shadow)
        {
            $weibo = new Model_Weibo;
            $weibo->save_shadow($shadow);
        }
    }

    public function action_statistics()
    {
        $weibo_shadow = new Model_Collect_Weibo;
        $weibo = new model_weibo;
        $outbox = new Model_Outbox;
        $time = strtotime('today');

        $weibo_shadow->where('wid', '=', 0)
            ->where('rid', '=', 0)
            ->where('created_at', '>=', $time)
            ->limit(1)
            ->find();
        $not_saved = $weibo_shadow->count_last_query();

        $weibo->where('source', '=', '')
            ->where('created_at', '>=', $time)
            ->limit(1)
            ->find();
        $here = $weibo->count_last_query();

        echo 'weibo collected: '. $weibo_shadow->count_all() . "<br>";
        echo 'weibo: '. $weibo->count_all() . "<br>";
        echo 'not saved: '.$not_saved.'<br>';
        echo 'published weibo today: '.$here.'<br>';

        die;
    }

    public function action_debug()
    {
        if('chemila' !== Arr::get($_GET, 'me', false))
        {
            $this->trigger_error('错误的请求');
        }

        var_dump(url::site('auth/oauth_callback', true));
    }
}// End Welcome
