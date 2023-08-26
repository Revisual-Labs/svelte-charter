/** @type { import('@storybook/svelte-vite').StorybookConfig } */
import remarkGfm from "remark-gfm";
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"],
  addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf'
	],
  framework: '@storybook/svelte-vite',
  docs: {
    autodocs: true,
  },
};
export default config;
