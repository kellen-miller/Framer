export type Book = {
    id: number,
    title: string,
    author: string,
}

const books = [
    {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'Author 2',
    },
    {
        id: 3,
        title: 'Book 3',
        author: 'Author 3',
    }
]

export const getBook = async (id: number): Promise<Book> => {
    return books.find(book => book.id === id) || {id: 0, title: '', author: ''};
}

export const getBooks = async ({limit}: { limit: number }): Promise<Book[]> => {
    return books.slice(0, limit);
}