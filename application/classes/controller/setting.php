<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Setting extends Controller_Authenticated {


    public function action_get_personality()
    {
        $model_setting = new model_setting($this->current_user());
        $record = $model_setting->get(Model_Setting_Category::PERSONAL);

        $this->request->response = core::debug($record);
    }

    public function action_add_personality()
    {
        $form = array(
            'created_at' => time(),
            'updated_at' => time(),
            'data' => array('name' => 'hello', 'confirm' => false),
        );

        $user = $this->current_user();
        $model_setting = new model_setting($user);

        $res = $model_setting->add($form, Model_Setting_Category::PERSONAL);

        $this->request->response = $res ? 'setting success' : 'setting failed';
    }

    public function action_update_personality()
    {
        $form = array(
            'updated_at' => time(),
            'data' => array('name' => 'chemila', 'confirm' => true, 'content' => 'update'),
        );

        $id = $this->request->param('id');

        $model_setting = new model_setting($this->current_user());
        $res = $model_setting->update($id, $form); 

        $this->request->response = $res ? 'update successfully' : 'update failed';
    }
}
