<script>
	export let data;
	import { VariableStore } from '../../../charts/VariableStore.js';

	//  set VariableStore.width.value = 500;
</script>

<section class="flex w-full">
	<div class="min-w-[50%]">
		<h1>{data.props.metadata.title}</h1>
	</div>
</section>

<div class="component-viewer overflow-y">
	<label
		>Bind to height
		<!-- slider for width -->
		<input
			type="range"
			min={$VariableStore.height.min}
			max={$VariableStore.height.max}
			bind:value={$VariableStore.height.value}
		/>
	</label>
	<label
	>Bind to width
	<!-- slider for width -->
	<input
		type="range"
		min={$VariableStore.width.min}
		max={$VariableStore.width.max}
		bind:value={$VariableStore.width.value}
	/>
</label>
	<svelte:component this={data.props.component} />
</div>
