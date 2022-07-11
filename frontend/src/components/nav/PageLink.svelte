<script lang="ts">
    import {page} from "$app/stores";

    export let name;
    export let path;

    $: pathname = $page.url.pathname
</script>


<a class="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0"
   class:active={pathname === path}
   href={path}>
    {name}
</a>


<style>
    .active {
        font-weight: bold;
    }
</style>