<script context="module" lang="ts">
    import type {Load} from '@sveltejs/kit'

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

<div class="error rounded-full">
    <h1>{title}</h1>
    <img
          alt="kramer says oops"
          src="/oops.jpg"
    />
</div>