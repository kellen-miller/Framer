<script lang="ts">
    import {sticky} from '@/lib/sticky'
    import {pages} from './Pages'
    import PageLink from "./PageLink.svelte";

    export let stickToTop = true;
    let isStuck = false;

    const handleStuck = (e) => {
        isStuck = e.detail.isStuck;
    }

</script>


<nav class="sticky bg-violet-300/90 backdrop-blur-3xl shadow-xl rounded-lg p-6 mx-5 flex items-center justify-between"
     class:isStuck
     data-position={ stickToTop ? 'top' : 'bottom' }
     on:stuck={ handleStuck }
     use:sticky={ stickToTop }
>
    <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Framer</span>
        </a>
        <div class="flex md:order-2">
            <button aria-controls="mobile-menu-3" aria-expanded="false"
                    class="md:hidden hover:bg-gray-100 focus:outline-none focus:ring-4 rounded-lg text-sm p-2.5 mr-1"
                    data-collapse-toggle="mobile-menu-3" type="button">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          fill-rule="evenodd"></path>
                </svg>
            </button>
            <div class="hidden relative md:block">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              fill-rule="evenodd"></path>
                    </svg>
                </div>
                <input class="block p-2 pl-10 w-full rounded-lg border border-gray-300 sm:text-sm" id="search-navbar"
                       placeholder="Search..." type="text">
            </div>
            <button aria-controls="mobile-menu-3" aria-expanded="false"
                    class="inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2"
                    data-collapse-toggle="mobile-menu-3" type="button">
                <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          fill-rule="evenodd"></path>
                </svg>
                <svg aria-hidden="true" class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          fill-rule="evenodd"></path>
                </svg>
            </button>
        </div>
        <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-3">
            <div class="relative mt-3 md:hidden">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              fill-rule="evenodd"></path>
                    </svg>
                </div>
                <input class="block p-2 pl-10 w-full rounded-lg border sm:text-sm" id="search-navbar-mobile"
                       placeholder="Search..." type="text">
            </div>
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                {#each pages as {name, path}}
                    <li>
                        <PageLink {name} {path}/>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</nav>

<style>
    [data-position='top'] {
        @apply top-4;
    }

    [data-position='bottom'] {
        @apply bottom-4;
    }

    nav.isStuck {
        @apply z-50
    }
</style>