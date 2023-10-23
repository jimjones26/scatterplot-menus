<script lang="ts">
	import { getContext } from 'svelte';

	// grab the chart data from the store
	const chartData: any = getContext('irisDataset');

	// width, height and margins for svg container
	const width: number = 960;
	const height: number = 500;
	const margin = { top: 20, right: 30, bottom: 50, left: 70 };
</script>

<svg {width} {height}> <g transform={`translate(${margin.left}, ${margin.top})`} /></svg>
