<script lang="ts">
	import * as d3 from 'd3';
	import type { IrisItem } from '$lib/stores/IrisItem';
	import { getContext } from 'svelte';

	// grab the chart data from the store
	const chartData: any = getContext('irisDataset');

	// width, height and margins for svg container
	const width: number = 960;
	const height: number = 500;
	const margin = { top: 20, right: 30, bottom: 50, left: 70 };

	// inner height and width of chart
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// x and y axis values
	const xValue = (item: IrisItem) => item.sepal_length;
	const yValue = (item: IrisItem) => item.petal_width;

	// x and y axis labels
	const xAxisLabel = 'Sepal Length';
	const yAxisLabel = 'Sepal Width';

	// x and y scales
	const xScale = d3
		.scaleLinear()
		.domain(<Iterable<number>>d3.extent($chartData, xValue))
		.range([0, innerWidth])
		.nice();
	const yScale = d3
		.scaleLinear()
		.domain(<Iterable<number>>d3.extent($chartData, yValue))
		.range([0, innerHeight])
		.nice();
</script>

<svg {width} {height}> <g transform={`translate(${margin.left}, ${margin.top})`} /></svg>
