<script lang="ts">
	export let innerHeight: number;
	export let xScale: any;
	export let tickOffset: number = 5;
</script>

{#each xScale.ticks() as tick, i}
	<g transform={`translate(${xScale(tick)}, 0)`}>
		<line x1={0} y1={0} x2={0} y2={innerHeight} stroke="#C0C0BB" />
		<text class="label" y={innerHeight + tickOffset} style="text-anchor: middle;" dy={'.71em'}
			>{tick}</text
		>
	</g>
{/each}

<style>
	.label {
		fill: #635f5d;
	}
</style>
