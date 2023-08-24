<script>
	export let data;
	import { VariableStore } from '../../../charts/VariableStore.js';
	console.log($VariableStore.tickFormatStyle.value);
</script>

<h1>{data.props.metadata.title}</h1>

<svelte:component this={data.props.component} />
