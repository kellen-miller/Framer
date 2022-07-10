import type {RequestHandler} from '@sveltejs/kit'

export const get: RequestHandler = async () => {

    const response = await fetch('http://localhost:8080/api/books')

    return {
        headers: {'Content-Type': 'application/json'},
        status: response.status,
        body: {...await response.json()}
    }
}
