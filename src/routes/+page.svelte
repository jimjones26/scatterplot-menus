<script lang="ts">
	import * as d3 from 'd3';
	import type { IrisItem } from '$lib/stores/IrisItem';
	import { getContext } from 'svelte';
	import AxisBottom from '$lib/components/AxisBottom.svelte';
	import AxisLeft from '$lib/components/AxisLeft.svelte';
	import Marks from '$lib/components/Marks.svelte';
	import * as Select from '$lib/components/ui/select';

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

<div>
	<Select.Root>
		<div class="flex">
			<Select.Label>X:</Select.Label>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Theme" />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="light">Light</Select.Item>
				<Select.Item value="dark">Dark</Select.Item>
				<Select.Item value="system">System</Select.Item>
			</Select.Content>
		</div>
	</Select.Root>
	<svg {width} {height}>
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			<AxisBottom {xScale} {innerHeight} tickOffset={10} />
			<AxisLeft {yScale} {innerWidth} tickOffset={10} />
			<Marks data={$chartData} {xScale} {yScale} {yValue} {xValue} circleRadius={10} />
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
