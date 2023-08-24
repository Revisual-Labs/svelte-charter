<script>
// @ts-nocheck

    import { scaleLinear, scaleSqrt, format, Delaunay, max } from "d3";
    import { onMount } from "svelte";
    import { VariableStore } from "../VariableStore";
    import data2 from "./data.json";
    // The data
    export let data = data2;
    $: country = $VariableStore.country.value;
    $: xProp =  $VariableStore.xProp.value;
    $: yProp =  $VariableStore.yProp.value;
    $: matchBy =    $VariableStore.matchBy.value;
    $: numSuffix = $VariableStore.numSuffix.value;
    $: perSuffix = $VariableStore.perSuffix.value;
    $: axisSuffix =     $VariableStore.axisSuffix.value;
    $: nameProp = $VariableStore.nameProp.value;
    $: percentageCorrector = $VariableStore.percentageCorrector.value;
    $: xTicks = $VariableStore.xTicks.value;

    // The chart
    $: padding = {
        top: $VariableStore.padding.top.value,
        right: $VariableStore.padding.right.value,
        bottom: $VariableStore.padding.bottom.value,
        left: $VariableStore.padding.left.value,
    };
    export let width = 1000;
    $: height = $VariableStore.height.value;

    // The style
    $: highlightedCircleOpacity     = $VariableStore.highlightedCircleOpacity.value;
    $: highlightColor = $VariableStore.highlightColor.value;
    $: defaultColor = $VariableStore.defaultColor.value;
    $: hoverColor = $VariableStore.hoverColor.value;
    $: minRadius = $VariableStore.minRadius.value;
    $: maxRadius = $VariableStore.maxRadius.value;
    $: strokeColor = $VariableStore.strokeColor.value;
    $: tickLength = $VariableStore.tickLength.value;

    // The tooltip
    $: hideThreshold = $VariableStore.hideThreshold.value;
    $: tooltipFormat = $VariableStore.tooltipFormat.value;
    $: displayAbsoluteValue = $VariableStore.displayAbsoluteValue.value;
    $: tooltipTextStrokeColor = $VariableStore.tooltipTextStrokeColor.value;
    $: tooltipTextStrokeWidth = $VariableStore.tooltipTextStrokeWidth.value;
    $: tooltipStartPosition = height * 0.75;
    $: chartStartPoint = height * 0.25;
    let showTooltip = false;
    let tooltipPosition = { x: 0, y: 0 };
    let tooltipData = {};
    $: maxXprop = max(data, (d) => d[xProp]);
    let delaunay;
    let voronoi;
    let countryIndex = data.findIndex((d) => d[matchBy] == country);
    let hideHighlight = false;
    $: selectedData = data.find((d) => d[matchBy] === country);
    $: tooltipFormatFn = format(tooltipFormat);

    $: console.log(xTicks);
    function handleMouseOver(triangle) {
        const countryCode = data[triangle][matchBy];

        if (
            Math.abs(data[triangle].x - data[countryIndex].x) <
                width * hideThreshold &&
            countryCode !== country
        ) {
            hideHighlight = true;
        } else {
            hideHighlight = false;
        }

        if (countryCode !== country) {
            showTooltip = true;

            tooltipData = data[triangle];
            tooltipPosition = { x: data[triangle].x, y: data[triangle].y };
        } else {
            hideHighlight = false;
        }
    }
    function handleMouseOut() {
        showTooltip = false;
        hideHighlight = false;
    }

    onMount(() => {
        const highlighted = document.getElementById(`highlighted`);
        if (highlighted){
            highlighted.parentNode.appendChild(highlighted);
        }
    });

    $: data.forEach((d) => {
        d.Percentage = (d[xProp] / d[yProp]) * percentageCorrector;
    });

    $: xScale = scaleLinear()
        .domain([0, max(data, (d) => d.Percentage)])
        .range([padding.left, width - padding.right]);

    $: radiusScale = scaleSqrt()
        .domain([0, maxXprop])
        .range([minRadius, maxRadius]);

    $: data.forEach((d) => {
        d.radius = radiusScale(d[xProp]);
    });

    // Computer the position of the circles in pixel space
    $: data.forEach((d) => {
        d.x = xScale(d.Percentage);
        d.y = height / 2;
    });

    $: {
        delaunay = Delaunay.from(
            data,
            (d) => d.x,
            (d) => d.y
        );
        voronoi = delaunay.voronoi([0, 0, width, height]);
    }
</script>

<div
    style="--hoverColor: {hoverColor};
           --tooltipTextStrokeColor: {tooltipTextStrokeColor};
           --tooltipTextStrokeWidth: {tooltipTextStrokeWidth}; "
    class="dot-plot"
    bind:clientWidth={width}
>
{#if selectedData}
    <div
        class="d-plot-tooltip highlighted"
        style="left: {xScale(
            selectedData.Percentage
        )}px; top: 0px; stroke: {tooltipTextStrokeColor};"
    >
        <!-- Tooltip -->
        
        <h4 class="highlight-header" style="color: {highlightColor}">
            {selectedData[nameProp]}
        </h4>
        
        <!-- Tooltip below the circle -->
        <p class="highlight-footer">
            <!-- Absolute value and percentage in separate lines -->
            {#if displayAbsoluteValue}
                <span style="display: block;"
                    >{tooltipFormatFn(selectedData[xProp])} {numSuffix}</span
                >
            {/if}
            {Math.round(selectedData.Percentage) < 1
                ? "<1"
                : Math.round(selectedData.Percentage)}% {perSuffix}
        </p>
    </div>
    {/if}
    <!-- End tooltip -->

    <!-- Highlight text -->
    <div
        class="d-plot-tooltip"
        style="left: {tooltipPosition.x}px; bottom: {height *
            0.25}px; stroke: {tooltipTextStrokeColor};"
    >
        <!-- Tooltip -->
        <h4 class:visible={showTooltip} class="dot-tooltip dot-header">
            {tooltipData[nameProp]}
        </h4>

        <!-- Tooltip below the circle -->
        <p class:visible={showTooltip} class="dot-tooltip dot-footer">
            <!-- Absolute value and percentage in separate lines -->
            {#if displayAbsoluteValue}
                <span style="display: block;"
                    >{tooltipFormatFn(tooltipData[xProp])} {numSuffix}</span
                >
            {/if}
            {Math.round(tooltipData.Percentage) < 1
                ? "<1"
                : Math.round(tooltipData.Percentage)}% {perSuffix}
        </p>
    </div>

    <svg id="chart" {width} {height}>
        <g>
            <!-- Voronoi Canvas -->
            {#each delaunay.triangles as triangle}
                <path
                    d={voronoi.renderCell(triangle)}
                    fill="transparent"
                    stroke="transparent"
                    stroke-width="0.1"
                    on:mouseover={handleMouseOver(triangle)}
                    on:mouseout={handleMouseOut}
                    on:focus={handleMouseOver(triangle)}
                    on:blur={handleMouseOut}
                />
            {/each}
        </g>
        <!-- End voronoi canvas -->
        <g>
            <!-- X axis -->
            {#each xTicks as tick}
                <!-- The small line -->
                <line
                    x1={xScale(tick)}
                    x2={xScale(tick)}
                    y1={height - chartStartPoint}
                    y2={height - chartStartPoint + tickLength}
                    stroke="#888888"
                    stroke-width="1"
                />
                <!-- The text -->
                <text
                    class="tick-text"
                    x={xScale(tick)}
                    y={height - chartStartPoint * 0.9 + tickLength * 2}
                    text-anchor="middle"
                >
                    <tspan
                        >{tick}
                        {tick === xTicks[xTicks.length - 1] ? "%" : ""}</tspan
                    >

                    {#if tick === xTicks[xTicks.length - 1]}
                        <tspan x={xScale(tick)} dy="1.2em">{axisSuffix}</tspan>
                    {/if}
                </text>
            {/each}
        </g>
        <!-- The selected circle -->
        {#if selectedData}
        <g id="highlighted">
            <!-- Country's circle -->
            <circle
                cx={xScale(selectedData.Percentage)}
                cy={height - chartStartPoint - selectedData.radius}
                r={selectedData.radius}
                fill={highlightColor}
                stroke={strokeColor}
                stroke-width="1.2"
                id="circle-{selectedData[matchBy]}"
                class="selected"
                style="opacity:{highlightedCircleOpacity}"
                on:mouseover={() => handleMouseOver(countryIndex)}
                on:mouseout={handleMouseOut}
                on:focus={() => handleMouseOver(countryIndex)}
                on:blur={handleMouseOut}
            />
            <line
                x1={xScale(selectedData.Percentage)}
                y1={// get tooltip position tooltipPosition.y * 1.5
                height - chartStartPoint - selectedData.radius * 2}
                x2={xScale(selectedData.Percentage)}
                y2={height - tooltipStartPosition}
                stroke={highlightColor}
                stroke-width="1"
                class={`highlighted-line`}
            />
            <circle
                cx={xScale(selectedData.Percentage)}
                cy={height - tooltipStartPosition}
                r={2}
                fill={highlightColor}
                stroke={strokeColor}
                stroke-width={0.5}
                class={`highlighted-dot`}
                style="opacity:1"
            />
        </g>
        {/if}
        <g>
            <!-- All others -->
            {#each data as d, i}
                {#if d[matchBy] !== country}
                    <g
                        class="tooltip-line"
                        class:visible={showTooltip &&
                            tooltipData[matchBy] === d[matchBy]}
                    >
                        <line
                            x1={xScale(d.Percentage)}
                            y1={// get tooltip position tooltipPosition.y * 1.5
                            height - chartStartPoint}
                            x2={xScale(d.Percentage)}
                            y2={height * 0.75}
                            stroke="#ccc"
                            stroke-width="1"
                            class={`line-${d[matchBy]} ${
                                tooltipData[matchBy] === d[matchBy] &&
                                showTooltip
                                    ? "line-hovered"
                                    : ""
                            }`}
                        />
                        <circle
                            cx={xScale(d.Percentage)}
                            cy={height * 0.75}
                            r={2}
                            fill={defaultColor}
                            stroke={strokeColor}
                            stroke-width={0.5}
                            class={`circle-${d[matchBy]} ${
                                tooltipData[matchBy] === d[matchBy] &&
                                showTooltip
                                    ? "circle-hovered"
                                    : ""
                            }`}
                            style="opacity:{0.45}"
                        />
                    </g>

                    <circle
                        cx={xScale(d.Percentage)}
                        cy={height - chartStartPoint - d.radius}
                        r={d.radius}
                        fill={defaultColor}
                        stroke={strokeColor}
                        stroke-width={0.5}
                        class={`circle-${d[matchBy]} ${
                            tooltipData[matchBy] === d[matchBy] && showTooltip
                                ? "circle-hovered"
                                : ""
                        }`}
                        style="opacity:{0.45}"
                        on:mouseover={() => handleMouseOver(data.indexOf(d))}
                        on:mouseout={handleMouseOut}
                        on:focus={() => handleMouseOver(data.indexOf(d))}
                        on:blur={handleMouseOut}
                    />
                {/if}
            {/each}
        </g>
    </svg>
</div>

<style>
    /* Select circles where class is not 'selected' and if hovered, make them more opaque */
    circle:not(.selected):hover {
        cursor: pointer;
        fill: var(--hoverColor);
        opacity: 1 !important;
    }

    .circle-hovered {
        opacity: 1 !important;
        fill: var(--hoverColor);
        transition: all 0.2s ease-in-out;
    }

    circle.selected {
        cursor: pointer;
    }

    .highlighted-text {
        font-size: 1.5em;
        text-anchor: middle;
        font-weight: bold;
        pointer-events: none;
    }

    .d-plot-tooltip {
        position: absolute;
        width: 200px;
       text-shadow: calc(-1px * var(--tooltipTextStrokeWidth))
               calc(-1px * var(--tooltipTextStrokeWidth)) 0
               var(--tooltipTextStrokeColor),
           calc(1px * var(--tooltipTextStrokeWidth))
               calc(-1px * var(--tooltipTextStrokeWidth)) 0
               var(--tooltipTextStrokeColor),
           calc(-1px * var(--tooltipTextStrokeWidth))
               calc(1px * var(--tooltipTextStrokeWidth)) 0
               var(--tooltipTextStrokeColor),
           calc(1px * var(--tooltipTextStrokeWidth))
               calc(1px * var(--tooltipTextStrokeWidth)) 0
               var(--tooltipTextStrokeColor);
    }

    .highlighted-suffix {
        text-anchor: middle;
        font-weight: 400;
        font-size: 0.7em;
        font-family: "Inter", sans-serif;
        fill: #0f0f10;
        pointer-events: none;
    }

    .tick-text {
        font-size: 13px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
        fill: #0f0f10;
    }

    .dot-header {
        position: absolute;
        text-align: center;
        color: rgb(36, 36, 36);
        font-size: 12px;
        pointer-events: none;
        visibility: hidden;
        z-index: 10;
        min-width: 80px;
        margin-top: 0.1rem;
        transform: translate(-50%, 0);
        opacity: 0;
        margin-bottom: 0;
        transition: opacity 0.1s ease-in-out;
    }

    .dot-plot {
        position: relative;
    }

    .dot-tooltip {
        position: absolute;
        /* Use text shadow to imitate stroke */
    }

    .d-plot-tooltip p {
        color: rgb(36, 36, 36);
        font-size: 12px;
        text-align: center;
        pointer-events: none;
        z-index: 10;
        min-width: 80px;
    }
    .dot-footer {
        visibility: hidden;

        left: 0;
        top: 0;
        transform: translate(-50%, 100%);
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
    }

    .dot-tooltip.visible {
        visibility: visible;
        opacity: 1;
    }

    .tooltip-line {
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
    }

    .tooltip-line.visible {
        opacity: 1;
    }

    p.dot-footer {
        color: #0f0f10;
        text-align: center;
        font-family: "Inter", sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0;
    }

    path:hover {
        cursor: pointer;
    }

    .d-plot-tooltip {
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .d-plot-tooltip.highlighted {
        position: absolute;
        transform: translate(-50%, 0);
        
    }

    .d-plot-tooltip h4,
    .d-plot-tooltip p {
        margin: 0;
    }

    /*  Add stroke on toltip text */
</style>