<script>
	import DocsSidebarNav from './DocsSidebarNav.svelte';
	export let data;
</script>

<main class="flex gap-7 flex-grow">
	<aside class="bg-white min-w-[15%]">
		<DocsSidebarNav list={data.props.charts} />
	</aside>
	<section class="flex-1">
		<slot />
	</section>
</main>
