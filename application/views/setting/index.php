<!--{include file="header/setting.php"}-->

<div class="main">
    <!--{include file="setting/top.php"}-->
    <form action="setting/update" method="post">
    <div class="main_c clearfix">
    <div class="content settings_con"> 
        <dl> 
            <dt><span class="fb f14">微博</span> <span class="gray">设置同时发布微博到原微博平台</span></dt>
            <dd>
                <label><input <!--{if $setting.weibo|default:1 eq 0}-->checked<!--{/if}--> name="weibo" type="radio" value="0" class="vm"> 不发布</label>
            </dd>
            <dd>
                <label><input <!--{if $setting.weibo|default:1 eq 1}-->checked<!--{/if}--> name="weibo" type="radio" value="1" class="vm"> 同时发布</label>
            </dd>
        </dl>
        <dl> 
            <dt><span class="fb f14">评论</span> <span class="gray">设置谁可以评论我的微博</span></dt>
            <dd>
                <label><input <!--{if $setting.comment|default:0 eq 0}-->checked<!--{/if}--> name="comment" type="radio" value="0" class="vm"> 所有人</label>（不包括你的黑名单用户）
            </dd>
            <dd>
                <label><input <!--{if $setting.comment|default:0 eq 1}-->checked<!--{/if}--> name="comment" type="radio" value="1" class="vm"> 我关注的人</label>
            </dd>
        </dl>
        <dl>
            <dt><span class="fb f14">私信</span> 设置谁可以给我发私信/引推关注</dt>
            <dd>
                <label><input <!--{if $setting.message|default:0 eq 0}-->checked<!--{/if}--> name="message" type="radio" value="0" class="vm"> 所有人</label>（不包括你的黑名单用户）</dd>
            <dd>
                <label><input <!--{if $setting.message|default:0 eq 1}-->checked <!--{/if}--> name="message" type="radio" value="1" class="vm"> 关注我的人</label></dd>
        </dl>
        <div class="btn tc"><input name="" type="submit" value=""></div>
        <!--设置 end--> 
    </div>
    </form>
    <!--{include file="setting/right.php"}-->
    </div>
    <div class="main_b"></div>
</div>
<!--{include file="footer/setting.php"}-->
