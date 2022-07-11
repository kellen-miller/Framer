<script context="module" lang="ts">
    import type {Load} from '@sveltejs/kit'

    // props keys are passed as variables to the script tag of the component
    export const load: Load = ({error, status}) => {
        return {
            props: {
                title: `${status}: ${error.message}`
            }
        }
    }
</script>

<script lang="ts">
    export let title
</script>

<section class="flex items-center h-full sm:p-16">
    <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
        <img
              alt="kramer says oops"
              src="/oops.jpg"
        />
        <p class="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find {title}</p>
        <p class="mt-4 mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
        <a class="px-8 py-3 font-semibold rounded" href="/" rel="noopener noreferrer">Back to homepage</a>
    </div>
</section>