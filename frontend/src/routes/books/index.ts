import type {RequestHandler} from "@sveltejs/kit";
import {getBooks} from "@/lib/repos/books";

export const get: RequestHandler = async ({url}) => {
    const limit = parseInt(url.searchParams.get("limit") || '10');
    const books = await getBooks({limit});

    return {
        body: {
            books
        }
    }
}