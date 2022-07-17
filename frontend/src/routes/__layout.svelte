<script lang="ts">
    // import '@/styles/app.css'
    // import Navbar from "@/components/nav/Navbar.svelte";
    import {
        ActionIcon,
        AppShell,
        Aside,
        Footer,
        Header,
        Navbar,
        ShellSection,
        SvelteUIProvider
    } from '@svelteuidev/core';
    import {Sun} from "radix-icons-svelte";

    let stickToTop = true;
    let isDark = false;
    let opened = false;

    function toggleTheme() {
        isDark = !isDark;
    }

    function toggleOpened() {
        opened = !opened;
    }
</script>

<SvelteUIProvider ssr themeObserver={isDark ? 'dark' : 'light'} withGlobalStyles withNormalizeCSS>
    <AppShell
          asideOffsetBreakpoint="sm"
          fixed
          navbarOffsetBreakpoint="sm"
    >
        <Navbar
              fixed
              hidden={!opened}
              hiddenBreakpoint="sm"
              override={{ p: '$mdPX' }}
              slot="navbar"
              width={{ sm: 200, lg: 250 }}
        >

            navbar content
            <!--            <NavbarContent />-->
        </Navbar>

        <Header fixed height={60} override={{ display: 'flex', p: '$mdPX' }} slot="header">
            <ActionIcon on:click={toggleTheme}>
                <Sun/>
            </ActionIcon>
            header content
            <!--            <HeaderContent />-->
        </Header>

        <!-- Main content uses the default slot, so no need to explicitly declare it -->
        <ShellSection grow>
            main content
            <!--            <MainContent />-->
        </ShellSection>

        <Aside slot="aside" width={{ base: 200 }}>
            aside content
            <!--            <AsideContent />-->
        </Aside>

        <Footer slot="footer">
            footer content
            <!--            <FooterContent />-->
        </Footer>
    </AppShell>
</SvelteUIProvider>
