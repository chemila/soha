<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Public extends Controller_Photo {

    public function action_index()
    {
        $this->init_view();
    }

    public function action_feed()
    {
        $page = $this->get_page();
        $model_weibo = new Model_Weibo;
        $photos = $model_weibo->photos($page);
        $data = array();

        foreach($photos as $weibo)
        {
            $content = $desc = $weibo->content;
            $url = $weibo->img ? $this->load($weibo->img) : '/media/img/404.png';
            $url = str_replace($_SERVER['DOCUMENT_ROOT'], '', $url);

            $json = array(
                'pk' => $weibo->pk(),
                'content' => $content,
                'image' => $url,
            );

            $data[] = array(
                'desc' => Text::limit_chars($desc, 25, '...'),
                'url' => $url,
                'link' => sprintf("details(%s);", json_encode($json)),
            );
        }

        $xml = $this->to_xml($data);
        die($xml);
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
            $url = $user->portrait ? $this->load($user->fix_portrait()) : '/media/img/portrait/default_m.jpg';
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

        $xml = $this->to_xml($data);
        die($xml);
    }
}
