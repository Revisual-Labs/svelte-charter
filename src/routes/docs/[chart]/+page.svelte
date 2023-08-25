
<script>

	import Properties from './Properties.svelte';
	import { VariableStore } from '../../../charts/VariableStore';
	import CodeViewer from './CodeViewer.svelte';
	
	export let data;

	$: ({ metadata, content, component, code, sampleData } = data.props);

	$: {
		VariableStore.set(metadata.config);
	}
</script>
<svelte:head>
	<title>{metadata.title} • Svelte Charter </title>
</svelte:head>
<section class="grid md:grid-cols-8 gap-6">
	<div class=" col-span-4 ">
		
		<div class="prose">
			<svelte:component this={content} />
		</div>
	
		<Properties data = {metadata.config} />
	</div>

	<div class="col-span-4 chart-viewer">
        <div class="h-full">
            <div class="sticky top-6 h-full flex gap-4 flex-col">
                <div class="border-b border-slate-200 pb-6 ">
                    <svelte:component this={component} />
                </div>
                <div>
                    <CodeViewer code={code} sampleData={sampleData} />
                </div>
            </div>
        </div>
    </div>
</section>
