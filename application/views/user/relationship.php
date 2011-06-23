<!--{include file="header.php"}--> 
<script type='text/javascript' src='media/js/google_jsapi.js'></script>
<script type='text/javascript'>
    google.load('visualization', '1', {packages:['orgchart']});
    google.setOnLoadCallback(drawChart);

    function drawChart() {
        var table = new google.visualization.DataTable();
        var data = <!--{$json}-->;

        table.addColumn('string', 'nick');
        table.addColumn('string', 'uid');
        table.addColumn('string', 'intro');
        var rows = [];

        for(var i = 0; i < data.length; i ++) {
            var row = [
                {
                    v: data[i].uid,
                    f: data[i].nick,
                },
                data[i].nick,
                data[i].intro
            ];
           
            rows.push(row);
        }
        table.addRows(rows);

        var chart = new google.visualization.OrgChart(document.getElementById('chart'));
        chart.draw(table, {allowHtml:true});
    }
</script>
</head>
<body>
    <div id='chart'></div>
</body>
</html>

