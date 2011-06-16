<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<base href="<!--{php}-->echo URL::base(false, true);<!--{/php}-->" />
		<title>Page not found!</title>
		<style type="text/css">
			body {
				background: #354E61 url(media/img/error/bg-main.png) top left repeat-x;
				font-family: 'Arial', sans-serif;
				font-size: small;
				color: #999;
			}
			.wrapper {
				width: 560px;
				margin: 0 auto;
				text-align: center;
			}
			.header {
				padding: 10px 15px 15px;
				background: url(media/img/error/bg-tabs.png) bottom repeat-x;
			}
			.content {
				padding: 15px;
			}
			hr {
				margin: 15px 0 0;
				border: none;
				border-top: dotted 1px #B9B9B9;
			}
			a {
				color: #058EC4;
				text-decoration: none;
			}
			a:hover {
				text-decoration: underline;
			}
			h1 a {
				display: block;
				width: 183px;
				height: 53px;
				margin: 0 auto;
			}
			h1 a span {
				display: none;
			}
			h2 {
				margin: 0;
				font-size: 1.9em;
				color: #333;
			}
			h3 {
				margin: 5px 0 0;
				font-size: 1em;
				color: #999;
			}
			p {
				margin: 20px 0 5px;
				font-size: 1.1em;
			}
			p a {
				margin: 0 5px;
			}
			.box {
				position: relative;
				background: #FFF;
			}
			.corner {
				position: absolute;
				width: 50%;
				height: 5px;
				background: url(media/img/error/corners-white.png) no-repeat;
			}
			.corner.tl {
				top: -5px;
				left: 0;
				background-position: left top;
			}
			.corner.tr {
				top: -5px;
				right: 0;
				background-position: right top;
			}
			.corner.bl {
				bottom: -5px;
				left: 0;
				background-position: left bottom;
			}
			.corner.br {
				bottom: -5px;
				right: 0;
				background-position: right bottom;
			}
			.picture {
				width: 530px;
				height: 244px;
				margin: 0 auto;
				background: url(media/img/error/bg-404.jpg) no-repeat;
			}
		</style>
	</head>

	<body>
		<div class="wrapper">
			<h1><a href="/"><span>Brightkite</span></a></h1>
			<div class="box">
				<div class="corner tl"></div>
				<div class="corner tr"></div>
				<div class="header">
					<h2>Oops, page not found</h2>

					<h3>You may have mistyped the URL or the page might have been deleted. Please check your spelling.</h3>
				</div>
				<div class="content">
					<div class="picture"></div>
					<hr />
					<p><a href="/">Go home</a> | <a href="auth">Log in</a> | <a href="help">Get help</a> | <a href="http://weibo.com/chemila">Chemila blog</a></p>
				</div>
				<div class="corner bl"></div>
				<div class="corner br"></div>
			</div>
		</div>
	</body>
</html>