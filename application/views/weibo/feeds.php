<!--{foreach from=$feeds item=weibo}--> 
    <!--{include file='weibo/feed.php' weibo=$weibo current_user=$current_user|default:0}-->  	
<!--{/foreach}--> 
