$(document).ready(function() {
    function formatTitle(title, currentArray, currentIndex, currentOpts) {
        return '<div id="fancybox-title-over"><span><a href="javascript:;" onclick="$.fancybox.close();"></a></span>' + (title && title.length ? '<b>' + title + '</b>' : '' ) + '</div>';
    }

    var defaultOpt = {
        //'titlePosition'		: 'inside',
        'showCloseButton'   : true,
        'width'				: '80%',
        'height'			: '90%',
        'overlayColor'		: '#000',
        'overlayOpacity'	: 0.5,
        'autoScale'			: true,
        'scrolling'         : 'auto',
        'transitionIn'      : 'fade',
        'transitionOut'     : 'fade',
        'onStart'           : $.fancybox.showActivity

    }

    $("#fancy_layer").fancybox($.extend(defaultOpt, {
        'titleFormat'       : formatTitle,
        'type'				: 'iframe'
    }));

    $("#fancy_calendar").fancybox($.extend(defaultOpt, {
        'type'				: 'iframe'
    }));

    $("#fancy_followers").fancybox($.extend(defaultOpt, {
        'type'				: 'iframe'
    }));

    $("#fancy_login").fancybox($.extend(defaultOpt, {
        'type'				: 'iframe'
    }));

    $("#fancy_users").fancybox($.extend(defaultOpt, {
        'type'				: 'iframe'
    }));
});
