<?php defined('SYSPATH') OR die('No direct access allowed.');

class Controller_sm extends Controller_Smarty{

    // Disable this controller when Kohana is set to production mode.
    // See http://docs.kohanaphp.com/installation/deployment for more details.
    const ALLOW_PRODUCTION = FALSE;

    // Set the name of the page layout template to use
    public $template = 'smarty:smarty_demo_page';

    public function action_index() {
      $view = view_smarty::factory('smarty:smarty_demo');
      // set variables for the 'features' section
      $view->myvar = 'This is a variable';
      $view->username = 'My Name';
      $view->set_global('myglobalvar', 'This is a global variable');

      // set variables for the 'demonstration' section
      $view->controller = file_get_contents(__FILE__);
      $view->wrapper = file_get_contents(APPPATH. '/views/smarty_demo_page.tpl');

      $this->template->title = 'Smarty Demonstration';
      $this->template->content = $view;

    }

    public function action_demo_text() {

      $this->template->content = file_get_contents(__FILE__);
      $this->template->set_filename('text:');
      $this->template->render();
    }

    public function action_demo_json() {
      // we can either put the data explicitly in a variable called _data, or do this
      // which is useful if the same controller is used for HTML and AJAX
      $this->template->title = 'This page has been updated';
      $this->template->content = 'This content has been delivered with <strong>AJAX</strong> - beware it contains &lt;script&gt; tags <script>alert(\'Told you so!\')</script>';
      $this->template->hidden = 'This page has been updated';
    //  $this->template->_no_header = true;
      $this->template->set_filename('json:');
      $this->template->render();
    }

}
