
<script>

	import Properties from './Properties.svelte';
	import { VariableStore } from '../../../charts/VariableStore';
	import CodeViewer from './CodeViewer.svelte';
	
	export let data;

	$: ({ metadata, content, component, code } = data.props);

	$: {
		VariableStore.set(metadata.config);
	}
</script>
<svelte:head>
	<title>{metadata.title} • Svelte Charter </title>
</svelte:head>
<section class="flex w-full max-w-9xl gap-6 py-8">
	<div class="min-w-[50%] overflow-y-scroll ">
		
		<div class="prose">
			<svelte:component this={content} />
		</div>
	
		<Properties data = {metadata.config} />
	</div>

	<div class=" w-full h-full sticky top-6 flex flex-col gap-2">
		<div class="flex-grow">
			<svelte:component this={component} />
		</div>
		<div class="flex-0 overflow-auto border border-slate-200 max-w-3xl max-h-96">
			<CodeViewer code={code} />
		</div>
	</div>
</section>
