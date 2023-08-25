<script>
	import DocsSidebarNav from './DocsSidebarNav.svelte';
</script>

<main class="flex  flex-grow">
	<aside class="bg-white min-w-[15%] border-r border-b-slate-50">
		<DocsSidebarNav  />
	</aside>
	<section class="flex-1 px-12">
		<slot />
	</section>
</main>
