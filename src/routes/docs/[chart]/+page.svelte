<script>
	export let data;
	import { VariableStore } from '../../../charts/VariableStore.js';
	import Properties from './Properties.svelte';
	const { title } = data.props.metadata;
	
</script>

<section class="flex w-full gap-6">
	<div class="min-w-[50%] overflow-y-scroll ">
		<h1>{title}</h1>
		<Properties data = {data.props.metadata.config} />
	</div>

	<div class="bg-red-50 w-full h-full sticky top-6 ">
		<svelte:component this={data.props.component} />
	</div>
</section>