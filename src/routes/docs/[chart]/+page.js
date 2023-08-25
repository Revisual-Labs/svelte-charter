import { dev } from '$app/environment';

export const csr = dev;
export const prerender = true;

export async function load({ params }) {
    const [componentModule, postModule, componentCode, dataCode] = await Promise.all([
        import(`../../../charts/${params.chart}/index.svelte`),
        import(`../../../charts/${params.chart}/readme.md`),
        import(`../../../charts/${params.chart}/index.svelte?raw`),
        import(`../../../charts/${params.chart}/data.json?raw`)
    ]);


    return {
        props: {
            component: componentModule.default, 
            metadata: postModule.metadata,
            content: postModule.default,
            code: componentCode.default,
            sampleData: dataCode.default
        }
    };
}
