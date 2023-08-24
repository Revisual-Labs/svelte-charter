<script>
	// @ts-nocheck
	import { scaleLinear, format, extent, Delaunay, Voronoi, max } from 'd3';
	import { VariableStore } from '../VariableStore';

	import data from './data.json';

	let dataConfig = {
        Conflict_IDPs: {
            color: "#006464",
            tooltipSuffix: "due to conflict",
        },
        Disaster_IDPs: {
            color: "#FFB03B",
            tooltipSuffix: "due to disaster",
        },
    };

	$: width = $VariableStore.width.value;
	$: height = $VariableStore.height.value;
	$: axisSuffix = $VariableStore.axisSuffix.value;
	$: padding = {
		top: $VariableStore.padding.top.value,
		right: $VariableStore.padding.right.value,
		bottom: $VariableStore.padding.bottom.value,
		left: $VariableStore.padding.left.value
	}
	$: xAxisKey = $VariableStore.xAxisKey.value;
	$: numberOfTicks = $VariableStore.numberOfTicks.value;
	$: nullValue = $VariableStore.nullValue.value;
	$: tickFormatStyle = $VariableStore.tickFormatStyle.value;
	$: toolTipFormatStyle = $VariableStore.toolTipFormatStyle.value;
	$: yAxisPosition = $VariableStore.yAxisPosition.value;
	$: fontSize = $VariableStore.fontSize.value;
	$: axisStroke = $VariableStore.axisStroke.value;
	$: strokeWidth = $VariableStore.strokeWidth.value;
	$: smallWidthThreshold = $VariableStore.smallWidthThreshold.value;
	let breakCount = 0;

	$: tickFormat = format(tickFormatStyle);
	$: tooltipFormat = format(toolTipFormatStyle);

	const keys = Object.keys(dataConfig);

	// Replace "NULL" in data with null for each key and make the rest numbers
	data.forEach((d) => {
		keys.forEach((key) => {
			if (d[key] === nullValue) {
				d[key] = null;
			} else {
				d[key] = +d[key];
			}
		});
	});

	// get the max value of the data for the y axis for the keys
	let yDomain = extent(data, (d) => keys.reduce((acc, key) => Math.max(acc, d[key]), 0));

	let xTicks = data.map((d) => d[xAxisKey]);

	$: xScale = scaleLinear()
		.domain(extent(xTicks))
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain(extent(yDomain))
		.range([height - padding.bottom, padding.top]);

	let paths = [];
	// Create paths
	$: {
		paths = keys.map((key) => {
			const linePath = data
				.map((d) => {
					if (d[key] !== null) {
						return [xScale(d[xAxisKey]), yScale(d[key])];
					} else {
						return null;
					}
				})
				.filter((d) => d !== null)
				.map((d, i) => {
					if (i === 0) {
						breakCount = 0;
						return `M ${d[0]} ${d[1]}`;
					} else {
						breakCount++;
						return `L ${d[0]} ${d[1]}`;
					}
				})
				.join(' ');

			return {
				key,
				path: linePath
			};
		});
	}

	function formatMobile(tick) {
		return "'" + tick.toString().slice(-2);
	}

	let points = [];
	let voronoi, delaunay;
	// Compute the position of all points from keys in pixel space
	$: {
		points = keys.map((key) => {
			return {
				key,
				data: data.map((d) => {
					if (d[key] !== null) {
						return d[key];
					} else {
						return null;
					}
				}),
				points: data
					.map((d) => {
						if (d[key] !== null) {
							return {
								coordinates: [xScale(d[xAxisKey]), yScale(d[key])],
								value: d[key],
								xAxis: d[xAxisKey]
							};
						} else {
							return null;
						}
					})
					.filter((d) => d !== null)
			};
		});
	}

	// Draw delaunay compution from all keys and points in point
	$: delaunay = Delaunay.from(points.flatMap((d) => d.points.map((p) => p.coordinates)));

	$: voronoi = delaunay.voronoi([
		0,
		0,
		width - padding.left - padding.right + 30,
		height - padding.top - padding.bottom + 30
	]);

	// I want to combine the data and the voronoi
	$: pointsIn = points.flatMap((d, i) => {
		return d.points.map((p) => {
			const { value, xAxis } = p;
			return {
				key: d.key,
				coordinates: p.coordinates,
				value,
				xAxis,
				triangle: delaunay.triangles[i]
			};
		});
	});

	let showTooltip = false;
	let showCircle;
	let tooltipData = {
		key: '',
		value: '',
		x: 0,
		y: 0,
		lineColor: '',
		tooltipSuffix: '',
		year: 0
	};
	function handleMousemove(event, d) {
		// d is index of the triangle
		let lineColor = dataConfig[d.key].color;
		tooltipData = {
			key: d.key,
			value: d.value,
			x: d.coordinates[0],
			y: d.coordinates[1],
			lineColor,
			tooltipSuffix: dataConfig[d.key].tooltipSuffix,
			year: d.xAxis
		};
		showTooltip = true;
		showCircle = `show-${d.value}-${d.xAxis}`;
	}

	function handleMouseout(event, d) {
		showTooltip = false;
		showCircle = '';
	}
</script>

<div class="chart" bind:clientWidth={width} style="--fontSize: {fontSize}">
	<svg {height} xml:space="default">
		<g>
			{#each pointsIn as point, i}
				<path
					class="voronoi"
					d={voronoi.renderCell(i)}
					fill="transparent"
					stroke="transparent"
					stroke-width="2"
					on:mousemove={(event) => handleMousemove(event, point)}
					on:mouseout={(event) => handleMouseout(event, point)}
					on:focus={(event) => handleMousemove(event, point)}
					on:blur={(event) => handleMouseout(event, point)}
				/>
			{/each}
		</g>
		<g>
			<!-- X axis -->
			<g class="x-axis">
				<line
					class="bottom-x-axis"
					x1={padding.left}
					x2={width - padding.right}
					y1={height - padding.bottom}
					y2={height - padding.bottom}
					stroke-width={strokeWidth}
					stroke={axisStroke}
				/>
				{#each xTicks as tick}
					{#if width > smallWidthThreshold || (width <= smallWidthThreshold && tick % 2 === 0)}
						<line
							x1={xScale(tick)}
							x2={xScale(tick)}
							y1={height - padding.bottom}
							y2={height - padding.bottom + 5}
							stroke-width={strokeWidth}
							stroke={axisStroke}
						/>
						<text
							class="tick"
							x={xScale(tick)}
							y={height - padding.bottom + 20}
							text-anchor="middle"
						>
							{#if width > smallWidthThreshold}
								{tick}
							{:else}
								{formatMobile(tick)}
							{/if}
						</text>
					{/if}
				{/each}
			</g>
			<!-- Y Axis -->
			<g
				class="y-axis"
				style="transform: ${yAxisPosition === 'left'
					? `translate(${padding.left - 5}px, 0)`
					: `translate(${width - padding.right - 5}px, 0)`}"
			>
				{#each yScale.ticks(numberOfTicks) as tick}
					<line
						x1={yAxisPosition === 'left' ? padding.left - 5 : width - padding.right + 8}
						x2={yAxisPosition === 'left' ? padding.left : width - padding.right + 3}
						y1={yScale(tick)}
						y2={yScale(tick)}
						stroke-width={strokeWidth}
						stroke={axisStroke}
					/>
					<text
						class="tick"
						x={yAxisPosition === 'left' ? padding.left - 10 : width - padding.right + 10}
						y={yScale(tick)}
						text-anchor={yAxisPosition === 'left' ? 'end' : 'start'}
						dominant-baseline="middle"
					>
						<tspan>{tickFormat(tick)}</tspan>
						<!-- if last tick -->
						{#if yScale.ticks(numberOfTicks).indexOf(tick) === numberOfTicks - 1}
							<!-- Add a line below the last tick -->
							<tspan
								x={yAxisPosition === 'left' ? padding.left - 5 : width - padding.right + 12}
								y={yScale(tick) + 5}
								dominant-baseline="hanging"
							>
								{axisSuffix}
							</tspan>
						{/if}
					</text>
				{/each}
			</g>
			<!-- Paths -->
			<g>
				{#each paths as { key, path }}
					<path
						class="path-line"
						fill="none"
						stroke-width="2"
						stroke={dataConfig[key].color}
						d={path}
					/>
				{/each}
			</g>
			<!-- Points -->
			{#each points as { key, points: point }}
				<g>
					{#each point as { coordinates, value, xAxis }}
						<circle
							class="show-{value}"
							cx={coordinates[0]}
							cy={coordinates[1]}
							r="3"
							fill={dataConfig[key].color}
							style="pointer-events: none;"
							opacity={showCircle === `show-${value}-${xAxis}` ? 1 : 0}
						/>
					{/each}
				</g>
			{/each}
		</g></svg
	>
	<div
		class="line-tooltip"
		style="
		left: {tooltipData.x}px;
		top: {tooltipData.y}px;
		border-left-color: {tooltipData.lineColor};
		display: {showTooltip ? 'block' : 'none'};
	"
	>
		<p class="year">{tooltipData.year}</p>

		<h4 style="color: {tooltipData.lineColor} ">
			{tooltipFormat(tooltipData.value)}
		</h4>
		<p>{tooltipData.tooltipSuffix}</p>
	</div>
</div>

<style>
	.chart {
		width: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	svg {
		position: relative;
		width: 100%;
		overflow: visible;
	}

	.tick {
		font-size: var(--fontSize) !important;
		font-weight: 200;
	}

	.x-axis line,
	.bottom-x-axis {
		stroke: #161616;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	text {
		white-space: pre;
	}

	.line-tooltip {
		position: absolute;
		background-color: #ffffff;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
		color: #111827;

		font-size: 0.475rem;
		font-weight: 600;
		line-height: 1.25rem;
		padding: 0.4rem 0.5rem;
		text-align: left;
		pointer-events: none;
		transform: translate(-50%, calc(-100% - 1rem));
		z-index: 1;
		border-left: 0.25rem solid;
	}

	h4 {
		/* Remove padding and margins */
		margin: 0;
		padding: 0;
		font-size: 1rem;
	}

	.line-tooltip p {
		margin: 1px 0 3px 0;
		padding: 0;
		font-size: 0.775rem;
		font-weight: 600;
		color: #49454f;
	}

	p.year {
		font-size: 0.775rem;
		font-weight: 600;
		line-height: 0.85rem;
		color: #727272;
		margin: 0.25rem 0 0.25rem 0;
	}
</style>
