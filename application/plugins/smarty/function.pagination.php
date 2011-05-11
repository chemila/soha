<?php
/**
 * Smarty check_login plugin
 *
 * Type:     function
 * Name:     check_login
 *
 * @param  Smarty
 * @return string  The translation (and substitution) of the string
 */
function smarty_function_pagination($params, &$smarty) 
{
    $total = Arr::get($params, 'total', 0);
    $perpage = Arr::get($params, 'perpage', 20);
    $key = Arr::get($params, 'key', 'page');

    // Check session or cookie whether user info exists
    $page = Pagination::factory(array(
        'total_items' => $total, 
        'view' => 'pagination',
        'items_per_page' => $perpage,
        'current_page' => array(
            'source' => 'query_string',
            'key' => 'page',
            ),
        )
    );

    return $page->render();
}
