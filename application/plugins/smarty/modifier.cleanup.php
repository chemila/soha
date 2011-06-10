<?php
function smarty_modifier_cleanup($string) {
    $string = str_replace(array('\r', '\n', '', $string));
    $string = strip_tags($string);
    $string = addslashes($string);

    return $string;
}
