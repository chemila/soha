<div class="blog_sidebar_title">
    <div class="clearfix">
        <h2 class="fl f14 fb">您关注的明星</h2>
    </div>
</div>
<!--关注的明星 start-->
<ul class="fans_list clearfix">
    <!--{include file="user/list.php" users=$followers}--> 	
</ul>
<!--<div class="more tr"><a href="#">更多&gt;&gt;</a></div>-->
<div class="line"></div>
<!--关注的明星 end-->

<div class="blog_sidebar_title">
    <div class="clearfix">
        <h2 class="fl f14 fb">您关注的普通用户</h2>
    </div>
</div>
<!--关注的明星 start-->
<ul class="fans_list clearfix">
    <!--{include file="user/list.php" users=$general_followers}--> 	
</ul>
<!--<div class="more tr"><a href="#">更多&gt;&gt;</a></div>-->
<div class="line"></div>
<!--关注的明星 end-->

<div class="blog_sidebar_title">
    <div class="clearfix">
        <h2 class="fl f14 fb">朋友们关注的</h2>
    </div>
    <!--TODO: count--> 
</div>
<ul class="fans_list clearfix">
    <!--{include file="user/list.php" users=$followers_of_friends}--> 
</ul>
<!--<div class="more tr"><a href="#">更多&gt;&gt;</a></div>-->
<div class="line"></div>

<!--和我互粉的 start-->
<div class="blog_sidebar_title">
    <h2 class="f14 fb">和我互粉的</h2>
</div>
<ul class="fans_list clearfix">
    <!--{include file="user/list.php" users=$friends}--> 
</ul>
<!--<div class="more tr"><a href="#">更多&gt;&gt;</a></div>-->
<div class="line"></div>
