<matches>
<partial><!--{$query}--></partial>
<!--{foreach from=$users item=user}--> 
<match l=''><!--{$user.nick}--></match>
<!--{foreachelse}--> 
<match l=''>没有找到相关用户</match>
<!--{/foreach}--> 
</matches>
