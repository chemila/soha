<?php

/**
 * The directory in which your application specific resources are located.
 * The application directory must contain the bootstrap.php file.
 *
 */
$application = 'application';

/**
 * The directory in which your modules are located.
 *
 */
$modules = 'modules';

/**
 * The system directory must contain the core file.
 */
$system = 'system';

/**
 * The media directory must contain the media file.
 *
 */
$media = 'media';


/**
 * The default extension of resource files. If you change this, all resources
 * must be renamed to use the new extension.
 *
 */
define('EXT', '.php');

/**
 * Set the PHP error reporting level. If you set this in php.ini, you remove this.
 * @see  http://php.net/error_reporting
 *
 * When developing your application, it is highly recommended to enable notices
 * and strict warnings. Enable them by using: E_ALL | E_STRICT
 *
 * In a production environment, it is safe to ignore notices and strict warnings.
 * Disable them by using: E_ALL ^ E_NOTICE
 *
 * When using a legacy application with PHP >= 5.3, it is recommended to disable
 * deprecated notices. Disable with: E_ALL & ~E_DEPRECATED
 */
error_reporting(E_ALL | E_STRICT);

// Set the full path to the docroot
define('DOCROOT', realpath(dirname(__FILE__)).DIRECTORY_SEPARATOR);

// Make the application relative to the docroot
if ( ! is_dir($application) AND is_dir(DOCROOT.$application))
	$application = DOCROOT.$application;

// Make the modules relative to the docroot
if ( ! is_dir($modules) AND is_dir(DOCROOT.$modules))
	$modules = DOCROOT.$modules;

// Make the system relative to the docroot
if ( ! is_dir($system) AND is_dir(DOCROOT.$system))
	$system = DOCROOT.$system;

// Make the media relative to the docroot
if ( ! is_dir($media) AND is_dir(DOCROOT.$media))
	$media = DOCROOT.$system;

// Define the absolute paths for configured directories
define('APPPATH', realpath($application).DIRECTORY_SEPARATOR);
define('MODPATH', realpath($modules).DIRECTORY_SEPARATOR);
define('SYSPATH', realpath($system).DIRECTORY_SEPARATOR);
define('MEDPATH', realpath($media).DIRECTORY_SEPARATOR);

// Clean up the configuration vars
unset($application, $modules, $system);

// Load the base, low-level functions
require SYSPATH.'base'.EXT;

// Load the core class
require SYSPATH.'classes/core'.EXT;

// Bootstrap the application
require APPPATH.'bootstrap'.EXT;
