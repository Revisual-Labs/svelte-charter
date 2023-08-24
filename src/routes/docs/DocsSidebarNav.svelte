<script>
	// A list of all the pages in the docs
	// All the pages are in the src/charts folder
	// Each folder in src/charts is a page
	// Get all the folders in src/charts
	const pages = import.meta.glob('/src/charts/**/index.svelte');

	const links = Object.keys(pages).map((page) => {
		const regex = /src\/charts\/(.*)\/index.svelte/;
		const match = page.match(regex);
		if (!match) return;
		return match[1];
	});
</script>

<nav>
	<ul>
		{#each links as link}
			<li>
				<a href={`/docs/${link}`}>{link}</a>
			</li>
		{/each}
	</ul>
</nav>
