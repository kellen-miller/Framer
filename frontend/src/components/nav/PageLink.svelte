<script lang="ts">
    import {page} from "$app/stores";

    export let name;
    export let path;

    $: pathname = $page.url.pathname
</script>

<div class="text-sm lg:flex-grow">
    <a class="mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" class:active={pathname === path}
       href={path}>
        {name}
    </a>
</div>

<style>
    .active {
        font-weight: bold;
    }
</style>