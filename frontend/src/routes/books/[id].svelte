<script lang="ts">
    import BookCard from "../../components/BookCard.svelte";
    import type {Book} from "@/lib/books";

    export let book: Book
</script>

<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
            {#await book}
                <p>waiting on book</p>
            {:then book}
                <BookCard title={book.title} author={book.author}/>
            {/await}
        </div>
    </div>
</section>