<!--{foreach from=$users item=obj}--> 
<li> 
    <a href="/home/profile/<!--{$obj.uid}-->"><img src="<!--{$obj.portrait}-->" width="50" height="50"></a> 
    <a href="/home/profile/<!--{$obj.uid}-->" class="name"><!--{$obj.nick}--></a> 
</li>
<!--{foreachelse}--> 
<li>没有关注</li>
<!--{/foreach}--> 

