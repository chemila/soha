<?php defined('SYSPATH') or die('No direct script access.');
define('SUPPRESS_REQUEST', true);

class Controller_Cron extends Controller {
    public function before()
    {
        //TODO: Do check client ip, protocal, is client first
        return parent::before();
    }

    public function action_run()
    {
        // Setting cron jobs here
        Cron::set('queue_pull', array('* * * * *', __CLASS__.'::queue_pull'));
	    Cron::run();
    }

    public static function queue_pull()
    {
        set_time_limit(55);
        $i = 0;

        while($i < 50)
        {
            $inbox = new Model_Inbox;
            $outbox = new Model_Outbox;
            $atme = new Model_Atme;

            $inbox->pull();
            $outbox->pull();
            $atme->pull();

            $i ++;
        }

        die;
    }
}
