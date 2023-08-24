import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex,escapeSvelte } from "mdsvex";
import adapter from '@sveltejs/adapter-static';
import shiki from "shiki";
/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".svx", ".md"],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
	},
	preprocess: [vitePreprocess(), mdsvex({
		extensions: ['.md', '.svx'],
		highlight: {
			highlighter: async (code, lang = 'text') => {
				const highlighter = await shiki.getHighlighter({ theme: 'slack-dark' });
				const result =  escapeSvelte(highlighter.codeToHtml(code, lang));
				return `{@html \`${result}\`}`;
			}
		}
	})]

};

export default config;
