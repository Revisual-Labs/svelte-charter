
import { dev } from '$app/environment';
export const csr = dev;
export const prerender = true;
import { VariableStore } from '../../../charts/VariableStore';
import { page } from '$app/stores';
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    const component = await import(`../../../charts/${params.chart}/index.svelte`);
    const {metadata } = await import(`../../../charts/${params.chart}/readme.md`);
    const post = await import(`../../../charts/${params.chart}/readme.md`);
    
    // set variables in the store
   VariableStore.set(metadata.config);
   console.log(metadata);
    return {
        props: {
            component: component.default,
            metadata: metadata,
            content: post.default
        }
    };

}  