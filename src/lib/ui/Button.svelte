<script>
	/**
	 * @type {string} href - The link to go to
	 */
	export let href = '#';
	/**
	 * @type {'normal' | 'green'} type - The type of button
	 */
	export let type = 'normal';
</script>

<!-- Button that can be a link too -->

{#if type === 'normal'}
	<a class="normal" {href}>
		<slot />
	</a>
{:else if type === 'green'}
	<a class="green" {href}>
		<slot />
	</a>
{/if}

<style>
	/* CSS */
	.normal {
		background-color: rgb(255, 255, 255);
		border: 1px solid rgb(209, 213, 219);
		border-radius: 0.5rem;
		box-sizing: border-box;
		color: #111827;
		font-family: 'Inter var', ui-sans-serif, system-ui, -apple-system, system-ui, 'Segoe UI', Roboto,
			'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
			'Segoe UI Symbol', 'Noto Color Emoji';
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.25rem;
		padding: 0.75rem 1rem;
		text-align: center;
		text-decoration: none #d1d5db solid;
		text-decoration-thickness: auto;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}

	.normal:hover {
		background-color: rgb(249, 250, 251);
	}

	.normal:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}

	.normal:focus-visible {
		box-shadow: none;
	}

	.green {
		appearance: none;
		background-color: #2ea44f;
		border: 1px solid rgba(27, 31, 35, 0.15);
		border-radius: 6px;
		box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
		box-sizing: border-box;
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji';
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		padding: 6px 16px;
		position: relative;
		text-align: center;
		text-decoration: none;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		vertical-align: middle;
		white-space: nowrap;
	}

	.green:focus:not(:focus-visible):not(.focus-visible) {
		box-shadow: none;
		outline: none;
	}

	.green:hover {
		background-color: #2c974b;
	}

	.green:focus {
		box-shadow: rgba(46, 164, 79, 0.4) 0 0 0 3px;
		outline: none;
	}

	.green:disabled {
		background-color: #94d3a2;
		border-color: rgba(27, 31, 35, 0.1);
		color: rgba(255, 255, 255, 0.8);
		cursor: default;
	}

	.green:active {
		background-color: #298e46;
		box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
	}
</style>
