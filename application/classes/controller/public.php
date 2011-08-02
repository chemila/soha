<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Public extends Controller_Base {

    public function action_index()
    {
        $this->init_view();
    }

    public function action_feed()
    {
        $page = $this->get_page();
        $model_weibo = new Model_Weibo;
        $photos = $model_weibo->photos(20, ($page - 1) * 20);
        $data = array();

        foreach($photos as $weibo)
        {
            $content = $desc = $weibo->content;
            $url = $weibo->img ? Model_Photo::load($weibo->img) : '/media/img/404.png';
            $size_info = Model_Photo::get_image_size($url, 800, 400);
            $url = str_replace($_SERVER['DOCUMENT_ROOT'], '', $url);

            $json = array(
                'pk' => $weibo->pk(),
                'content' => $content,
                'href' => '/feed/show/'.$weibo->pk().'?url='.$url,
                'width' => $size_info[0],
                'height' => $size_info[1],
            );

            $data[] = array(
                'desc' => Text::limit_chars($desc, 25, '...'),
                'url' => $url,
                'link' => sprintf("showFeed(%s);", json_encode($json)),
            );
        }

        die(Model_Photo::to_xml($data));
    }

    public function action_user()
    {
        $page = $this->get_page();
        $model_user = new Model_User;
        $photos = $model_user->photos($page);
        $data = array();

        foreach($photos as $user)
        {
            $content = $user->location.' '.$user->intro;
            $desc = '@'.$user->nick.' '.$user->intro;
            $url = $user->portrait ? Model_Photo::load($user->fix_portrait()) : '/media/img/portrait/default_m.jpg';
            $url = str_replace($_SERVER['DOCUMENT_ROOT'], '', $url);

            $json = array(
                'pk' => $user->pk(),
                'content' => $content,
                'image' => $url,
            );

            $data[] = array(
                'desc' => Text::limit_chars($desc, 25, '...'),
                'url' => $url,
                'link' => sprintf("details(%s);", json_encode($json)),
            );
        }

        die(Model_Photo::to_xml($data));
    }

    public function action_profile()
    {
        $page = $this->get_page();
        $uid = $this->request->param('uid', false);

        $model_user = $uid ? new Model_User($uid) : $this->get_current_user();
        $model_user->reload();

        if( ! $model_user->loaded())
            $this->trigger_error();

        $feeds = $model_user->feeds->where('img', '!=', '')
            ->order_by('id', 'desc')
            ->limit(20)
            ->offset(($page - 1) * 20)
            ->find_all();

        $data = array();
        foreach($feeds as $weibo)
        {
            $content = $desc = $weibo->content;
            $url = Model_Photo::load($weibo->img);
            $url = str_replace($_SERVER['DOCUMENT_ROOT'], '', $url);
            $size_info = Model_Photo::get_image_size($url, 600, 600);

            $json = array(
                'pk' => $weibo->pk(),
                'content' => $content,
                'image' => $url,
                'width' => $size_info['width'],
                'height' => $size_info['height'],
            );

            $data[] = array(
                'desc' => Text::limit_chars($desc, 25, '...'),
                'url' => $url,
                'link' => sprintf("details(%s);", json_encode($json)),
            );
        }

        die(Model_Photo::to_xml($data));
    }
}
