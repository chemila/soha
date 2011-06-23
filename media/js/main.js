$(document).ready(function() {
        
    function formatTitle(title, currentArray, currentIndex, currentOpts) {
        return '<div id="fancybox-title-over"><span><a href="javascript:;" onclick="$.fancybox.close();"></a></span>' + (title && title.length ? '<b>' + title + '</b>' : '' ) + '</div>';
    }
    $("#fancy_layer").fancybox({
        'titlePosition'		: 'over',
        'showCloseButton'   : true,
        'overlayColor'		: '#777',
        'autoScale'			: true,
        'overlayOpacity'	: 0.7,
        'titleFormat'       : formatTitle,
        'onClosed'      : function() {
            // Close events goes here
        }
    });

    $("#fancy_calendar").fancybox({
        'showCloseButton'   : true,
        'overlayColor'		: '#777',
        'overlayOpacity'	: 0.7,
        'width'				: '70%',
        'height'			: '70%',
        'autoScale'			: false,
        'transitionIn'		: 'none',
        'transitionOut'		: 'none',
        'type'				: 'iframe'
    });

    $("#fancy_chart").fancybox({
        'showCloseButton'   : true,
        'overlayColor'		: '#777',
        'overlayOpacity'	: 0.7,
        'width'				: '70%',
        'height'			: '70%',
        'autoScale'			: false,
        'transitionIn'		: 'none',
        'transitionOut'		: 'none',
        'type'				: 'iframe'
    });

    $("#login").fancybox({
        'scrolling' : 'no',
        'titleShow' : true
    });
});

