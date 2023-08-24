<script>
	import DocsSidebarNav from './DocsSidebarNav.svelte';
	export let data;
</script>

<main class="flex  flex-grow">
	<aside class="bg-white min-w-[15%] border-r border-b-slate-50">
		<DocsSidebarNav list={data.props.charts} />
	</aside>
	<section class="flex-1 px-12">
		<slot />
	</section>
</main>
