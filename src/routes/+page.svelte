<script>
	import Button from '$lib/ui/Button.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Svelte rig for interactive charts</h1>

	<div class="cta">
		<Button href="/docs" type="normal">Read the docs</Button>
		<Button href="https://github.com/Revisual-Labs/chart-starter" type="green">GitHub</Button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 60%;
	}

	.cta {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 60%;
		margin-top: 2rem;
		gap: 1rem;
	}
</style>
