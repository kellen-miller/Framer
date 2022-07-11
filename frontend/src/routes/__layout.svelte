<script lang="ts">
    import '@/styles/app.css'
    import Navbar from "@/components/nav/Navbar.svelte";

    let stickToTop = true;
</script>

{#if !stickToTop}
    <slot/>
{/if}
<Navbar {stickToTop}/>
{#if stickToTop}
    <slot/>
{/if}

