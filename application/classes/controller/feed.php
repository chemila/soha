<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Feed extends Controller_Authenticated {

    public function action_show()
    {
        $id = $this->request->param('id', false);
        $url = Arr::get($_GET, 'url', false);

        if( ! $id)
        {
            $this->trigger_error();
        }

        $weibo = new Model_Weibo($id);

        if( ! $weibo->loaded())
        {
            $this->trigger_error();
        }
        if( ! $url)
        {
            $url = $weibo->img ? Model_Photo::load($weibo->img) : '/media/img/404.png';
        }

        if(0 !== strpos('http://', $url))
        {
            $url = URL::site($url, true);
        }

        $size_info = Model_Photo::get_image_size(URL::site($url, true), 800, 600);

        $this->init_view();
        $this->view->src = $url;
        $this->view->size = $size_info;
        $this->view->weibo = $weibo->as_array() + array('user' => $weibo->user->find($weibo->uid)->as_array());
    }
}
