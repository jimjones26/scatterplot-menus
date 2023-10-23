<script lang="ts">
	import type { IrisItem } from '$lib/stores/IrisItem';

	export let data: Array<IrisItem>;
	export let xScale: any;
	export let yScale: any;
	export let xValue: any;
	export let yValue: any;
	export let circleRadius: number;
</script>

{#each data as item, i}
	<circle cx={xScale(xValue(item))} cy={yScale(yValue(item))} r={circleRadius} fill="#137B80">
		<title>{`x: ${xValue(item)}, y: ${yValue(item)}`}</title>
	</circle>
{/each}
