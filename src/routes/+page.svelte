<script lang="ts">
	import * as d3 from 'd3';
	import { getContext } from 'svelte';
	import AxisBottom from '$lib/components/AxisBottom.svelte';
	import AxisLeft from '$lib/components/AxisLeft.svelte';
	import Marks from '$lib/components/Marks.svelte';
	import AxisSelectMenus from '$lib/components/AxisSelectMenus.svelte';
	import { dataStore } from '$lib/stores/data-store';
	import ColorLegend from '$lib/components/ColorLegend.svelte';

	// grab the chart data from the store
	const chartData: any = getContext('irisDataset');

	// create attributes object for axis' values and labels
	const attributes = [
		{ value: 'sepal_length', label: 'Sepal Length' },
		{ value: 'sepal_width', label: 'Sepal Width' },
		{ value: 'petal_length', label: 'Petal Length' },
		{ value: 'petal_width', label: 'Petal Width' },
		{ value: 'species', label: 'Species' }
	];

	// width, height and margins for svg container
	const width: number = 960;
	const height: number = 500;
	const margin = { top: 20, right: 105, bottom: 50, left: 70 };

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
	const colorValue = (item: any) => item.species;

	// create function to get value from label
	const getLabel = (value: string) => {
		for (let i = 0; i < attributes.length; i++) {
			if (attributes[i].value === value) {
				return attributes[i].label;
			}
		}
	};

	// x and y axis labels
	$: xAxisLabel = getLabel($chartData.selectedX);
	$: yAxisLabel = getLabel($chartData.selectedY);

	$: filteredData = $chartData.data.filter((d: any) => $chartData.hoveredValue === colorValue(d));

	// x and y scales
	$: xScale = d3
		.scaleLinear()
		.domain(<Iterable<number>>d3.extent($chartData.data, xValue))
		.range([0, innerWidth])
		.nice();
	$: yScale = d3
		.scaleLinear()
		.domain(<Iterable<number>>d3.extent($chartData.data, yValue))
		.range([0, innerHeight])
		.nice();
	$: colorScale = d3
		.scaleOrdinal()
		.domain($chartData.data.map(colorValue))
		.range(['#E6842A85', '#137B8085', '#8E6C8A85']);
</script>

<div class="mt-5">
	<AxisSelectMenus {attributes} {xAxisLabel} {yAxisLabel} />
	<svg {width} {height}>
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			<AxisBottom {xScale} {innerHeight} tickOffset={15} />
			<AxisLeft {yScale} {innerWidth} tickOffset={15} />
			<g transform={`translate(${innerWidth + 20}, 10)`}
				><ColorLegend {colorScale} tickSpacing={25} tickSize={8} /></g
			>
			<g opacity={$chartData.hoveredValue ? 0.2 : 1}>
				<Marks
					data={$chartData.data}
					{xScale}
					{yScale}
					{yValue}
					{xValue}
					{colorScale}
					{colorValue}
					circleRadius={8}
				/>
			</g>
			<Marks
				data={filteredData}
				{xScale}
				{yScale}
				{yValue}
				{xValue}
				{colorScale}
				{colorValue}
				circleRadius={8}
			/>
			<text
				text-anchor="middle"
				transform={`translate(${-45}, ${innerHeight / 2}) rotate(-90)`}
				class="fill-slate-600 text-lg">{yAxisLabel}</text
			>
			<text
				x={innerWidth / 2}
				y={innerHeight + 45}
				text-anchor="middle"
				class="fill-slate-600 text-lg">{xAxisLabel}</text
			>
		</g></svg
	>
</div>
