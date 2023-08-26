import remarkGfm from 'remark-gfm';
/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf',
		{
			name: '@storybook/addon-docs',
			options: {
			  csfPluginOptions: null,
			  jsxOptions: {},
			  mdxPluginOptions: {
				mdxCompileOptions: {
				  remarkPlugins: [remarkGfm],
				},
			  },
			},
		  },
		"@storybook/addon-controls",
		{
			name: '@storybook/addon-storysource',
			options: {
				rule: {
					test: [/\.stories\.svelte$/],
					include: [require('path').resolve(__dirname, '../src')],
				},
				loaderOptions: {
					prettierConfig: { printWidth: 80, singleQuote: false }, injectStoryParameters: false,
				},
			},
		}
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: true,
	}
};
export default config;
