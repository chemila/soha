<?php if ($first_page !== FALSE): ?>
    <a href="<?php echo HTML::chars($page->url($first_page)) ?>" class="prev2">首页</a>
<?php else: ?>
    <a href="#" class="prev2">首页</a>
<?php endif ?>

<?php if ($previous_page !== FALSE): ?>
    <a href="<?php echo HTML::chars($page->url($previous_page)) ?>" rel="prev" class="prev">上一页</a>
<?php else: ?>
    <a href="#" class="prev">上一页</a>
<?php endif ?>

<?php for ($i = 1; $i <= $total_pages; $i++): ?>

    <?php if ($i == $current_page): ?>
        <span class="current">[<?php echo $i ?>]</span>
    <?php else: ?>
        <a href="<?php echo HTML::chars($page->url($i)) ?>"><?php echo $i ?></a>
    <?php endif ?>

<?php endfor ?>

<?php if ($next_page !== FALSE): ?>
    <a href="<?php echo HTML::chars($page->url($next_page)) ?>" rel="next" class="next">下一页</a>
<?php else: ?>
    <a href="#" class="next">下一页</a>
<?php endif ?>

<?php if ($last_page !== FALSE): ?>
    <a href="<?php echo HTML::chars($page->url($last_page)) ?>" rel="last" class="next2">末页</a>
<?php else: ?>
    <a href="#" class="next2">末页</a>
<?php endif ?>
