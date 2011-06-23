<!--{include file="header.php"}--> 
<div id='container'></div>
<script type="text/javascript" src="media/js/gchart.js"></script>
<script type="text/javascript">
var goptions = {
    type : 'gv',
    size : '400x400',
    data : 'a->b->c->d->a',
    renderTo: 'container',
    //applyTo: 'container',
    id : 'mimg'
};
GChart.render(goptions);
</script>
</body>
</html>

