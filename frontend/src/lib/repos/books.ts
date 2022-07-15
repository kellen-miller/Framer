export type Book = {
    id: number,
    title: string,
    author: string,
}

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080
const baseUrl = `http://${host}:${port}`
// const baseUrl = "http://localhost:8080/books"; // local dev
// const baseUrl = "http://host.docker.internal:8080/books"; // docker compose
// const baseUrl = "http://framer-server.internal:8080/books"; // fly

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
    const response = await fetch(url);
    return response.json();
}