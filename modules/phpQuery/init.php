<?php
/**
 * This file is executed everytime classes is included. Use it to set all
 * your personal needs in the library.
 *
 * probably you want to use one of those functions here
 */

//classes::ajaxAllowHost();
//classes::ajaxAllowURL();
//classes::plugin();

// class names for instanceof
// TODO move them as class constants into classes
define('DOMDOCUMENT', 'DOMDocument');
define('DOMELEMENT', 'DOMElement');
define('DOMNODELIST', 'DOMNodeList');
define('DOMNODE', 'DOMNode');

phpQuery::$plugins = new phpQueryPlugins();

// Load Zend's Autoloader
if ($path = Core::find_file('vendor', 'Zend/Loader'))
{
	ini_set('include_path', ini_get('include_path').PATH_SEPARATOR.dirname(dirname($path)));
	require_once 'Zend/Loader.php';
}
