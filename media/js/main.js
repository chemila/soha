$(document).ready(function() {
        
    function formatTitle(title, currentArray, currentIndex, currentOpts) {
        return '<div id="fancybox-title-over"><span><a href="javascript:;" onclick="$.fancybox.close();"></a></span>' + (title && title.length ? '<b>' + title + '</b>' : '' ) + '</div>';
    }
    $("#fancy_layer").fancybox({
        'titlePosition'		: 'over',
        'showCloseButton'   : true,
        'overlayColor'		: '#000',
        'autoScale'			: true,
        'overlayOpacity'	: 0.5,
        'titleFormat'       : formatTitle,
        'onClosed'      : function() {
            // Close events goes here
        }
    });

    $("#fancy_calendar").fancybox({
        'showCloseButton'   : true,
        'overlayColor'		: '#000',
        'overlayOpacity'	: 0.5,
        'width'				: '70%',
        'height'			: '70%',
        'autoScale'			: false,
        'transitionIn'		: 'none',
        'transitionOut'		: 'none',
        'type'				: 'iframe'
    });

    $("#fancy_chart").fancybox({
        'showCloseButton'   : true,
        'overlayColor'		: '#000',
        'overlayOpacity'	: 0.5,
        'width'				: '70%',
        'height'			: '70%',
        'autoScale'			: false,
        'transitionIn'		: 'none',
        'transitionOut'		: 'none',
        'type'				: 'iframe'
    });

    $("#login").fancybox({
        'showCloseButton'   : true,
        'overlayColor'		: '#000',
        'overlayOpacity'	: 0.5,
        'width'				: '70%',
        'height'			: '70%',
        'autoScale'			: false,
        'scroll'            : 'no',
        'transitionIn'		: 'none',
        'transitionOut'		: 'none',
        'type'				: 'iframe'
    });
});

