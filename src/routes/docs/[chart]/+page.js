
import { dev } from '$app/environment';
export const csr = dev;
export const prerender = true;
export async function load({ params }) {
	console.log(params.chart);
    const component = await import(`../../../charts/${params.chart}/index.svelte`);
    const {metadata } = await import(`../../../charts/${params.chart}/readme.md`);
    const post = await import(`../../../charts/${params.chart}/readme.md`);
    

    return {
        props: {
            component: component.default,
            metadata: metadata,
            content: post.default,
			  }
    };

}  

