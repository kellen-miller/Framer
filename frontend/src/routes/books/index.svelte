<script lang="ts">
    import BookCard from "@/components/BookCard.svelte";
    import type {Book} from "@/lib/books";

    export let books: Book[]
</script>

<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
            {#if books === undefined}
                LOADING THOSE BOOKS...
            {:else}
                {#each books as book, index (book.id)}
                    <BookCard title={book.title} author={book.author}/>
                {/each}
            {/if}
        </div>
    </div>
</section>