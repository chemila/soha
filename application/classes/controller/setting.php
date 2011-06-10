<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Setting extends Controller_Authenticated {

    public function action_index()
    {
    	// Init view cache modules etc.
        $this->init_view();
        $this->init_user($this->user);
        
        $obj = Model::factory("setting")->by_user($this->user->pk());
        $setting = $obj->get_default();

        if($obj->loaded())
        {
            $setting = unserialize($obj->data);
        }

        $this->view->setting = $setting;
    }
    
    public function action_update()
    {
        $setting = new Model_Setting(array('uid' => $this->user->pk(), 'category' => 0));
        
        if( ! $setting->loaded())
        {
            $setting->created_at = time();
            $setting->uid = $this->user->pk();
        }

        $setting->data = serialize($setting->merge_default($_POST));
        $setting->updated_at = time();
        $setting->save();

        if($setting->saved())
        {
            $this->request->redirect('/setting');
        }
        else
        {
            $this->trigger_error('设置失败');
        }
    }
}
