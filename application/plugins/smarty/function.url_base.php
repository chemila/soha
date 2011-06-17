<?php
function smarty_function_url_base($params, &$smarty) 
{
    return URL::base(false, true);
}

