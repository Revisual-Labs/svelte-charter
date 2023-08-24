<script>
	export let data;
	import { VariableStore } from '../../../charts/VariableStore.js';
	import Properties from './Properties.svelte';
	const { title } = data.props.metadata;
	
</script>

<section class="flex w-full max-w-9xl gap-6 py-8">
	<div class="min-w-[50%] overflow-y-scroll ">
		
		<div class="prose">
			<svelte:component this={data.props.content} />
		</div>
	
		<Properties data = {data.props.metadata.config} />
	</div>

	<div class=" w-full h-full sticky top-6 ">
		<svelte:component this={data.props.component} />
	</div>
</section>
