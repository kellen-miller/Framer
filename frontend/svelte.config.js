import adapter from 'svelte-adapter-bun';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit')} */
const config = {
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
	kit: {
		adapter: adapter()
	}
};

export default config;