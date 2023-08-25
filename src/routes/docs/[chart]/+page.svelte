
<script>
	import { onMount, beforeUpdate } from 'svelte';
	import { page } from '$app/stores';
	import Properties from './Properties.svelte';
	import { VariableStore } from '../../../charts/VariableStore';
	
	const { component, content, metadata } = $page.data.props;
	
	beforeUpdate(() => {
		VariableStore.set(metadata.config);
	});
	
</script>

<section class="flex w-full max-w-9xl gap-6 py-8">
	<div class="min-w-[50%] overflow-y-scroll ">
		
		<div class="prose">
			<svelte:component this={content} />
		</div>
	
		<Properties data = {metadata.config} />
	</div>

	<div class=" w-full h-full sticky top-6 ">
		<svelte:component this={component} />
	</div>
</section>
