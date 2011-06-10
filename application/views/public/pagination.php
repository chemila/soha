<div style="" class="MIB_bobar">
	<!--翻页-->
		<div id="feed_foot" class="fanye MIB_txtbl rt">
			<?php if ($first_page !== FALSE): ?>
				<a href="<?php echo HTML::chars($page->url($first_page)) ?>" class="btn_num btn_numWidth"><em>返回首页</em></a>
			<?php endif ?>
		
			<?php if ($previous_page !== FALSE): ?>
				<a href="<?php echo HTML::chars($page->url($previous_page)) ?>" class="btn_num btn_numWidth"><em>上一页</em></a>
			<?php endif ?>
			<a id="paging_popup" href="javascript:void(0);" class="btn_numOn btn_numWidth"><em class="MIB_txtal">第 <?php echo $current_page;?> 页<img align="absmiddle" class="pagenum_arrow" src="/star/media/img/common/transparent.gif"></em></a>
			<!--翻页浮层-->
			<!--/翻页浮层-->
			<?php if( $next_page <= 10 ):?>
				<?php if ($next_page !== FALSE): ?>
					<a href="<?php echo HTML::chars($page->url($next_page)) ?>" class="btn_num btn_numWidth"><em>下一页</em></a>
				<?php endif ?>
			
				<?php if ($last_page !== FALSE): ?>
					<a href="<?php echo HTML::chars($page->url(min(10,$last_page))) ?>" class="btn_num btn_numWidth"><em>最后一页</em></a>
				<?php endif ?>
			<?php endif ?>
		</div>
	<!--翻页-->
</div>

<div id="page_div" style="left: 659px; top: 12750px; display: none;" class="pagenumLayer MIB_txtbl">
	<ul>
	
	<?php for ($i = 1; $i <= min(10,$total_pages); $i++): ?>

		<?php if ($i == $current_page): ?>
			<li class="cur"><a href="javascript:void(0);">第 <?php echo $i ?> 页</a></li>
		<?php else: ?>
			<li><a href="<?php echo HTML::chars($page->url($i)); ?>">第 <?php echo $i ?> 页</a></li>
		<?php endif ?>

	<?php endfor ?>

	</ul>
</div>