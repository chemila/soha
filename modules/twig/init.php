<?php defined('SYSPATH') or die('No direct script access.');

// Load the Twig class autoloader
require Core::find_file('vendor', 'Twig/lib/Twig/Autoloader');

// Register the Twig class autoloader
Twig_Autoloader::register();
