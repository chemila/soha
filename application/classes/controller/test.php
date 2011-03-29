<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller {

	public function action_index()
	{
		$this->request->response = 'hey u!';
	}

    public function action_core() {
        $res = Core::find_file('class', 'CE');

        //var_dump(Validate::email('test@@fdsf.com'));
        $this->request->response = Core::debug(Core::config('database'));
    }

    public function action_phpquery() 
    {
        phpQuery::browserGet(
            'http://www.324324.cn/top/qq_wb.php?page=1&order=tz',
            'parse_tenx'
        );
        $this->request->response = Core::debug(extension_loaded('mbstring') && phpQuery::$mbstringSupport);
    }

    public function action_database() 
    {
        $res = DB::query(Database::SELECT, 'select * from pin_collect_list order by rand(unix_timestamp()) limit 10')
            ->execute()
            ->as_array();

        $this->request->response = Core::debug($res);
	    // Create a custom configured instance
    }

    public function action_oauth()
    {
        $oauth = new OAuth('sina');

        $this->request->redirect($oauth->request());
    }

    public function action_oauth_access()
    {
        $oauth = new OAuth('sina');
        $oauth->access();
    }

    public function action_api()
    {
    }
} // End Welcome

