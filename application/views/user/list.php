<!--{foreach from=$users item=obj}--> 
<li> 
    <a namecard="true" href="home/profile/<!--{$obj.uid}-->" uid="<!--{$obj.uid}-->"><img src="<!--{$obj.portrait|fix_portrait}-->" width="50" height="50"></a> 
    <a namecard="true" href="home/profile/<!--{$obj.uid}-->" uid="<!--{$obj.uid}-->" class="name"><!--{$obj.nick}--></a> 
</li>
<!--{foreachelse}--> 
<li>没有关注</li>
<!--{/foreach}--> 

