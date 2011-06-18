<?php /* Smarty version 2.6.26, created on 2011-06-18 23:26:36
         compiled from header.php */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'url_base', 'header.php', 4, false),array('modifier', 'default', 'header.php', 6, false),)), $this); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head>
<base href="<?php echo smarty_function_url_base(array(), $this);?>
" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><?php echo ((is_array($_tmp=@$this->_tpl_vars['title'])) ? $this->_run_mod_handler('default', true, $_tmp, 'Welcome. Under constructing...') : smarty_modifier_default($_tmp, 'Welcome. Under constructing...')); ?>
</title>
<link href="media/css/base.css" rel="stylesheet" type="text/css">