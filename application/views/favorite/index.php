<!--{include file="header/setting.php"}-->
<div class="main">
    <!--{include file="setting/top.php"}-->
    <div class="main_c clearfix">
        <div class="content" id="feed_title">
            <ul class="mail_list" id="feed_list">
                <!--{foreach from=$favorites item=favorite}--> 
                <li><!--{include file='favorite/feed.php'}--></li>
                <!--{foreachelse}-->
                <li>
                    无收藏信息
                </li>
                <!--{/foreach}-->
            </ul>
            <div class="page"> 
                <span class="fr"><!--{pagination total=$count|default:0}--></span> 
            </div>
        </div>
    <!--{include file="setting/right.php"}-->
    </div>
    <div class="main_b"></div>
</div>
<!--{include file="footer/setting.php"}-->
