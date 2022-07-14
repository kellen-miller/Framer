export type Book = {
    id: number,
    title: string,
    author: string,
}

// const baseUrl = "http://server:8080/books";
const baseUrl = "framer-server.internal:8080/books";


export const getBook = async (id: number): Promise<Book> => {
    const url = `${baseUrl}/${id}`;
    const response = await fetch(url);
    return response.json();
}

export const getBooks = async ({limit, sort}: { limit: number, sort: string }): Promise<Book[]> => {
    const queryParams = new URLSearchParams()
    if (limit) {
        queryParams.append('limit', String(limit))
    }
    if (sort) {
        queryParams.append('sort', sort)
    }
    const url = baseUrl + (queryParams.toString() ? '?' + queryParams.toString() : '')
    console.log(url)
    const response = await fetch(url);
    return response.json();
}