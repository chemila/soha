<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller_Base {
	public function action_index()
	{
        $this->request->redirect('error/404');
	}

    public function action_debug()
    {
        if( ! $_FILES)
        {
            echo<<<HTML
            <form action="/test/debug" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" />
                <input type="submit" value="submit" />
            </form>
HTML;
            die;
        }
        else
        {
            $config = Core::config('upload');
            $path = $config->get('path');
            $file = 'test.png';

            if($res = Upload::save($_FILES['file'], $file, $path))
            {
                var_dump($path.DIRECTORY_SEPARATOR.$file);
            }
            else
            {
                var_dump($res);
            }
        }
    }

    public function action_cache()
    {
        $f = 'http://ww1.sinaimg.cn/large/3e4fe687jw1dhljk6gcalj.jpg';
        $file = Core::cache($f, file_get_contents($f), NULL, '.jpg');
        var_dump($file);
    }
}// End Welcome
