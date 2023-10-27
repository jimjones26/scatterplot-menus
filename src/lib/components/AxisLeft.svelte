<script lang="ts">
	export let yScale: any;
	export let innerWidth: number;
	export let tickOffset: number = 5;
</script>

{#each yScale.ticks() as tick, i}
	<g transform={`translate(0, ${yScale(tick)})`}>
		<line x2={innerWidth} class="stroke-slate-300" />
		<text class="fill-slate-500 text-sm" style="text-anchor: end;" dy=".32em" x={-tickOffset}
			>{tick}</text
		>
	</g>
{/each}
