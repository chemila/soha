<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Twig template controller
 */
abstract class Controller_Twig extends Controller {

	/**
	 * @var Twig_Environment
	 */
	public $twig;

	/**
	 * @var boolean  Auto-render template after controller method returns
	 */
	public $auto_render = TRUE;

	/**
	 * @var array|object  Stores mapping of template vars => values
	 */
	public $context;

	public function __construct(Request $request)
	{
		// Setup the Twig loader environment
        // Load Twig configuration
        $config = Core::config('twig');

        // Create the the loader
        $loader = new Twig_Loader_Filesystem($config->templates);

        // Set up Twig
        $this->twig = new Twig_Environment($loader, $config->environment);

        foreach ($config->extensions as $extension)
        {
            // Load extensions
            $this->twig->addExtension(new $extension);
        }

        if ($config->context_object)
        {
            // Context treated as an object
            $this->context = new stdClass;
        }
        else
        {
            // Context treated as an array
            $this->context = array();
        }

		// Auto-generate template filename 
        //('index' method called on Controller_Admin_Users looks for 'admin/users/index')
		$this->template = $request->controller.'/'.$request->action.$config->suffix;

		if ($request->directory)
		{
			// Preprend directory if needed
			$this->template = $request->directory.'/'.$this->template;
		}

		parent::__construct($request);
	}

	public function after()
	{
		if ($this->auto_render)
		{
			// Auto-render the template
			$this->request->response = $this->twig->loadTemplate($this->template)->render((array) $this->context);
		}
	}
} // End Controller_Twig
