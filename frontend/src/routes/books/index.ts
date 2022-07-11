import type {RequestHandler} from "@sveltejs/kit";
import {getBooks} from "@/lib/repos/books";

export const get: RequestHandler = async ({url}) => {
    const limit = parseInt(url.searchParams.get("limit") || '');
    const sort = url.searchParams.get("sort") || undefined;
    const books = await getBooks({limit, sort});

    return {
        body: {
            books
        }
    }
}