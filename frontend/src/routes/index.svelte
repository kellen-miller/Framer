<script lang="ts">
    import "@/styles/app.css";
    import {onMount} from "svelte";

    const getBooks = async () => {
        const response = await fetch("http://localhost:8080/books", {
            method: 'GET',
            headers: {
                "accept": "application/json",
            }
        })
        return await response.json();
    }

    let books
    onMount(async () => {
        books = await getBooks()
    });
</script>

<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
            Welcome to the bookshelf!
        </div>
    </div>
</section>