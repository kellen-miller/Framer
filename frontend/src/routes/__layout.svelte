<script lang="ts">
    import '@/styles/app.css'
    import Navbar from "@/components/nav/Navbar.svelte";

    let stickToTop = true;
</script>

<Navbar {stickToTop}/>
<main>
    <slot/>
</main>
