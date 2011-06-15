<?php /* Smarty version 2.6.26, created on 2011-06-13 14:47:27
         compiled from header/top.php */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'is_current', 'header/top.php', 10, false),array('modifier', 'default', 'header/top.php', 10, false),)), $this); ?>
<div class="mxk_header">
    <p class="tr mxk_header_top">
        <a href="message">私信</a> | 
        <a href="favorite">收藏</a> | 
        <a href="setting">设置</a><!--  | 
        <a href="help">帮助</a> -->
    </p>
    <ul class="nav">
        <li>
            <a href="public" <?php echo smarty_function_is_current(array('uri' => "/"), $this);?>
>微博明星(<?php echo ((is_array($_tmp=@$this->_tpl_vars['stars_count_all'])) ? $this->_run_mod_handler('default', true, $_tmp, 5126) : smarty_modifier_default($_tmp, 5126)); ?>
)</a>
        </li>
        <li>
            <a href="home" <?php echo smarty_function_is_current(array('uri' => 'home'), $this);?>
>我的首页</a>
        </li>
        <li>
            <a href="home/profile" <?php echo smarty_function_is_current(array('uri' => 'profile'), $this);?>
>我的微博</a>
        </li>
    </ul>
    <p class="accredit">
    <?php if (((is_array($_tmp=@$this->_tpl_vars['is_login'])) ? $this->_run_mod_handler('default', true, $_tmp, false) : smarty_modifier_default($_tmp, false))): ?>
        <a href="auth/logout">退出</a> 您已授权微博应用
    <?php else: ?>
        <a href="auth">未授权</a> 请先认证
    <?php endif; ?>
    </p>
</div>