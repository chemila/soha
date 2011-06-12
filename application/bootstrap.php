<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Set the default time zone.
 */
date_default_timezone_set('Asia/Shanghai');

/**
 * Set the default locale.
 */
setlocale(LC_ALL, 'zh_CN.utf-8');

/**
 * Enable the auto-loader.
 */
spl_autoload_register(array('Core', 'auto_load'));

/**
 * Enable the auto-loader for unserialization.
 */
ini_set('unserialize_callback_func', 'spl_autoload_call');

/**
 * Initialize setting the default options.
 *
 * The following options are available:
 *
 * - string   base_url    path, and optionally domain, of your application   NULL
 * - string   index_file  name of your index file, usually "index.php"       index.php
 * - string   charset     internal character set used for input and output   utf-8
 * - string   cache_dir   set the internal cache directory                   APPPATH/cache
 * - boolean  errors      enable or disable error handling                   TRUE
 * - boolean  caching     enable or disable internal caching                 FALSE
 */
Core::init(array(
	'base_url'   => '/',
    'index_file' => 'index.php',
    'cache_dir' => $_SERVER['CACHE_DIR'],
    'errors' => FALSE,       
    'charset' => 'utf-8',
    'caching' => FALSE,
));

/**
 * Attach the file write to logging. Multiple writers are supported.
 */
Core::$log->attach(new Log_File(Core::$cache_dir));

/**
 * Attach a file reader to config. Multiple readers are supported.
 */
Core::$config->attach(new Config_File);

/**
 * Enable modules. Modules are referenced by a relative or absolute path.
 */
Core::modules(array(
	'cache'      => MODPATH.'cache',      // Caching with multiple backends
	'database'   => MODPATH.'database',   // Database access
	'image'      => MODPATH.'image',      // Image manipulation
	'oauth'      => MODPATH.'oauth',      // OAuth authentication
	'pagination' => MODPATH.'pagination', // Paging of results
    'orm'        => MODPATH.'orm',
    'smarty'     => MODPATH.'smarty',
    'queue'      => MODPATH.'queue',      // Queue access
    'cron'       => MODPATH.'cron',       // Run cron job
));
/**
 * Set the routes. Each route must have a minimum of a name, a URI and a set of
 * defaults for the URI.
 */
echo 'Email me：';
echo Text::auto_link_emails('chemila@gmail.com');
echo "<br>TO BE CONTINUED<br>";
die;
Route::load();

if ( ! defined('SUPPRESS_REQUEST'))
{
	/**
	 * Execute the main request. A source of the URI can be passed, eg: $_SERVER['PATH_INFO'].
	 * If no source is specified, the URI will be automatically detected.
	 */
    try
    {
        echo Request::instance()
            ->execute()
            ->send_headers()
            ->response;
    }
    catch(Exception $e)
    {
        echo Request::factory('/error')
        	->execute()
            ->send_headers()
            ->response;
    }
}
