import type {RequestHandler} from "./__types/[id]";
import {getBook} from "../../lib/repos/books";

export const get: RequestHandler = async ({params}) => {
    const {id} = params;
    const book = await getBook(parseInt(id));
    if (book) {
        return {
            body: {
                book
            }
        }
    }
    return {status: 404}
}