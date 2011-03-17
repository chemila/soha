<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Welcome extends Controller {

	public function action_index()
	{
		$this->request->response = 'hey u!';
	}

    public function action_test() {
        $res = Core::find_file('class', 'CE');
        //var_dump(Core::config('database')); 
        //var_dump(Validate::email('test@@fdsf.com'));

        $doc = phpQuery::newDocumentHTML('<div id="test">test</div>');
        $this->request->response = 'tset';
    }

    public function action_tenx() 
    {
        phpQuery::browserGet(
            'http://www.324324.cn/top/qq_wb.php?page=1&order=tz',
            'parse_tenx'
        );
    }
} // End Welcome

function parse_tenx($browser) {
    $trs = $browser->find('table tr:gt(0)');
    
    if( ! $trs)
        return false;

    $data = array();

    foreach($trs as $tr) {
        $data['uid'] = phpQuery::pq($tr)->find('td:eq(1) a:eq(1)')->text();
        $data['nick'] = iconv('gbk', 'utf-8', phpQuery::pq($tr)->find('td:eq(2) a:eq(0) font')->html());
        $data['src'] = 'tenx';
        $data['rank'] = (int)phpQuery::pq($tr)->find('td:eq(4)')->text();
        $data['place'] = phpQuery::pq($tr)->find('td:eq(7) a')->text();
        $data['url'] = phpQuery::pq($tr)->find('td:eq(8) a')->attr('href');

        var_dump($data);
    }
}


