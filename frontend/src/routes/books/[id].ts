import type {RequestHandler} from "./__types/[id]";
import {getBook} from "../../lib/repos/books";

export const GET: RequestHandler = async ({params}) => {
    const {id} = params;
    const book = await getBook(parseInt(id));
    if (book.id > 0) {
        return {
            body: {
                book
            }
        }
    }
    return {status: 404}
}