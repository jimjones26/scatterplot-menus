<script lang="ts">
	import * as d3 from 'd3';
	import type { IrisItem } from '$lib/stores/IrisItem';
	import { getContext } from 'svelte';
	import AxisBottom from '$lib/components/AxisBottom.svelte';
	import AxisLeft from '$lib/components/AxisLeft.svelte';
	import Marks from '$lib/components/Marks.svelte';
	import AxisSelectMenus from '$lib/components/AxisSelectMenus.svelte';
	import { dataStore } from '$lib/stores/data-store';

	// grab the chart data from the store
	const chartData: any = getContext('irisDataset');

	// create attributes object for axis' values and labels
	const attibutes = [
		{ value: 'sepal_length', label: 'Sepal Length' },
		{ value: 'sepal_width', label: 'Sepal Width' },
		{ value: 'petal_length', label: 'Petal Length' },
		{ value: 'petal_width', label: 'Petal Width' },
		{ value: 'species', label: 'Species' }
	];

	// width, height and margins for svg container
	const width: number = 960;
	const height: number = 500;
	const margin = { top: 20, right: 30, bottom: 50, left: 70 };

	// inner height and width of chart
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// define initial axis values and update store
	const initialXAttribute = 'petal_length';
	dataStore.updateSelectedX(initialXAttribute);
	const initialYAttribute = 'sepal_width';
	dataStore.updateSelectedY(initialYAttribute);

	// x and y axis values
	const xValue = (item: any) => item[$chartData.selectedX];
	const yValue = (item: any) => item[$chartData.selectedY];

	// x and y axis labels
	const xAxisLabel = 'Sepal Length';
	const yAxisLabel = 'Sepal Width';

	// x and y scales
	const xScale = d3
		.scaleLinear()
		.domain(<Iterable<number>>d3.extent($chartData.data, xValue))
		.range([0, innerWidth])
		.nice();
	const yScale = d3
		.scaleLinear()
		.domain(<Iterable<number>>d3.extent($chartData.data, yValue))
		.range([0, innerHeight])
		.nice();
</script>

<div>
	{$chartData.selectedX}
	{$chartData.selectedY}
	<AxisSelectMenus />
	<svg {width} {height}>
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			<AxisBottom {xScale} {innerHeight} tickOffset={10} />
			<AxisLeft {yScale} {innerWidth} tickOffset={10} />
			<Marks data={$chartData.data} {xScale} {yScale} {yValue} {xValue} circleRadius={10} />
			<text
				text-anchor="middle"
				transform={`translate(${-40}, ${innerHeight / 2}) rotate(-90)`}
				class="fill-slate-600 text-xl">{yAxisLabel}</text
			>
			<text
				x={innerWidth / 2}
				y={innerHeight + 40}
				text-anchor="middle"
				class="fill-slate-600 text-xl">{xAxisLabel}</text
			>
		</g></svg
	>
</div>
