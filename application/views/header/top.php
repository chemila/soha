<div class="mxk_header">
    <p class="tr mxk_header_top">
        <a href="message">私信</a> | 
        <a href="favorite">收藏</a> | 
        <a href="setting">设置</a><!--  | 
        <a href="help">帮助</a> -->
    </p>
    <ul class="nav">
        <li>
            <a href="public" <!--{is_current uri="/"}-->>微博明星(<!--{$stars_count_all|default:5126}-->)</a>
        </li>
        <li>
            <a href="home" <!--{is_current uri="home"}-->>我的首页</a>
        </li>
        <li>
            <a href="home/profile" <!--{is_current uri="profile"}-->>我的微博</a>
        </li>
    </ul>
    <p class="accredit">
    <!--{if $is_login|default:false}-->
        <a href="auth/logout">退出</a> 您已授权微博应用
    <!--{else}-->
        <a href="auth">未授权</a> 请先认证
    <!--{/if}-->
    </p>
</div>
