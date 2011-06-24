<?php
function smarty_modifier_fuzzy_time($time)
{
    return Date::fuzzy_span($time);
}
?>

