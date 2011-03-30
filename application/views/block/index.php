<h1>{$title|default:"黑名单列表"}</h1>

<ul>
{foreach from=$blocks item=block}
    <li>{$block.id} : {$block.reason}</li>
{/foreach}
</ul>
