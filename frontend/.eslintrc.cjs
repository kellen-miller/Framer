import typescript from 'typescript'

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'square-svelte-store'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs']
	overrides: [{files: ['*.svelte'], processor: 'svelte3/svelte3'}],
	settings: {'svelte3/typescript': () => typescript},
	rules: {'square-svelte-store/use-square-svelte-store': 'error'},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
