import {sveltekit} from '@sveltejs/kit/vite';
import path from "path";

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    resolve: {
        alias: {
            "@": path.resolve('./src'),
        },
    },
    server: {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }
};

export default config;