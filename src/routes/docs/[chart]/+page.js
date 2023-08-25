import { dev } from '$app/environment';

export const csr = dev;
export const prerender = true;

export async function load({ params }) {
    const [componentModule, postModule, componentCode] = await Promise.all([
        import(`../../../charts/${params.chart}/index.svelte`),
        import(`../../../charts/${params.chart}/readme.md`),
        import(`../../../charts/${params.chart}/index.svelte?raw`)
    ]);

    const { default: component } = componentModule;
    const { default: content, metadata } = postModule;
    const { default: code } = componentCode;

    return {
        props: {
            component,
            metadata,
            content,
            code
        }
    };
}
