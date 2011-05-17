<div>
    <dl class="name clearFix">
        <dt>
            <a href="/home/profile/<!--{$user.uid}-->" target="_blank"><img src="<!--{$user.portrait|fix_portrait}-->" imgtype="head" uid="<!--{$user.uid}-->" title="<!--{$user.nick}-->" class="picborder_r"></a>
        </dt>
        <dd class="name_card_con0">
            <a href="/home/profile/<!--{$user.uid}-->" title="<!--{$user.nick}-->" uid="<!--{$user.uid}-->" target="_blank"><!--{$user.nick}--><!--{if $user.verified|default:false}--><img class="small_icon vip" src="http://img.t.sinajs.cn/t3/style/images/common/transparent.gif" > <!--{/if}--></a>
            <!--<span>(<a href="javascript:void(0)" onclick="if(parseInt(Math.random()*10000)%1000 &lt; 10){ GB_SUDA._S_uaTrack('tblog_userprofile_layer','followRemarkAdd')};App.followRemarkAdd(this,<!--{$user.uid}-->,'');return false;">设置备注</a>)</span>-->
            <p class="address"><!--{$user.location|default:'其他'}-->
                <img src="http://img.t.sinajs.cn/miniblog2style/images/common/transparent.gif" class="small_icon man" title="<!--{$user.gender|default:'男'}-->">
            </p>
            <p class="name_card_con4">
                <span><a href="/attention?fuid=<!--{$user.uid}-->" title="<!--{$user.friends_count}-->" target="_blank">关注</a><!--{$user.friends_count}--></span><i>|</i>
                <span><a href="/attention/fans?fuid=<!--{$user.uid}-->" title="<!--{$user.followers_count}-->" target="_blank">粉丝</a><!--{$user.followers_count}--></span><i>|</i>
                <span><a href="/home/profile/<!--{$user.uid}-->" title="<!--{$user.statuses_count}-->" target="_blank">微博</a><!--{$user.statuses_count}--></span>
            </p>
        </dd>
    </dl>
    <dl class="info clearFix">
        <dt>简介：</dt>
        <dd><p class="gray6" title="<!--{$user.intro}-->"><!--{$user.intro}--></p></dd>
	</dl>	   
    <div class="links">
        <!--{if $followed}--> 
        <div class="MIB_btn2 rt">已关注<span class="MIB_line_sp">|</span>
            <a class="MIB_linkbl" href="javascript:void(0)" onclick="if(parseInt(Math.random()*10000)%1000 &lt; 10){GB_SUDA._S_uaTrack('tblog_userprofile_layer','userCardRemoveFollow')};App.userCardRemoveFollow(<!--{$user.uid}-->,this,'');return false;"><em>取消关注</em></a>
        </div>
        <!--{else}--> 
        <a href="javascript:void(0);" onclick="App.userCardFollow(<!--{$user.uid}--> ,this);if(GB_SUDA&amp;&amp;(parseInt(Math.random()*10000)%1000 &lt; 10))GB_SUDA._S_uaTrack('tblog_userprofile_layer','userCardFollow');" class="btn_add"><img class="SG_icon" src="http://img.t.sinajs.cn/t3/style/images/common/transparent.gif" title="加关注"><em>加关注</em></a>
        <!--{/if}--> 
        <span class="name_card_con3">
            <i class="com_mess">&nbsp;</i>
            <a href="javascript:void(0)" onclick="if(parseInt(Math.random()*10000)%1000 &lt; 10){GB_SUDA._S_uaTrack('tblog_userprofile_layer','msgDialog')};App.msgDialog('<!--{$user.nick}-->',false);">私信</a>
        </span>
        <!--
        <i>|</i>
        <span class="name_card_con3">
            <i class="com_edit">&nbsp;</i>
            <a href="javascript:void(0)" onclick="if(parseInt(Math.random()*10000)%1000 &lt; 10){GB_SUDA._S_uaTrack('tblog_userprofile_layer','grpDialog')};App.grpDialog({'show' : true,'name':<!--{$user.nick}-->, 'oid' : <!--{$user.uid}-->, 'remarkName' : '', 'gids' : ''},false);">设置分组</a>
        </span>
        -->
    </div>
</div>
