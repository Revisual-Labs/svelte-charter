<script>
	/**
	 * Represents a chart object with title and path properties.
	 * @typedef {Object} ChartObject
	 * @property {string} title - The title of the chart.
	 * @property {string} path - The slugified path of the chart.
	 */

	/**
	 * @type {ChartObject[]}
	 */
	export let list = [
		{title: 'Line Chart',
		path: 'line-chart'},
		{title: 'Dot Plot',
		path: 'dot-plot'},
	];
</script>

<nav >
	<ul class="flex flex-col py-6">
		{#each list as link}
			<a class="font-regular" href={`/docs/${link.path}`}>
				<li
					class="py-2 px-6 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 ease-in-out"
				>
					{link.title}
				</li>
			</a>
		{/each}
	</ul>
</nav>
