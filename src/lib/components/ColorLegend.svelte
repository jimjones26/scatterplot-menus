<script lang="ts">
	import { dataStore } from '$lib/stores/data-store';
	export let colorScale: any;
	export let tickSpacing: any;
	export let tickSize: any;
	export let hoveredValue: any;

	const colorDomains: any = colorScale.domain().map((domainValue: any) => {
		return domainValue;
	});

	const onHover = (domain: any) => {
		dataStore.updateHoveredValue(domain);
	};
</script>

{#each colorDomains as domain, i}
	<g
		class="mt-4 cursor-default"
		transform={`translate(0, ${i * tickSpacing})`}
		on:mouseenter={() => {
			onHover(domain);
		}}
		on:mouseleave={() => {
			onHover(null);
		}}
		role="contentinfo"
		opacity={hoveredValue && domain !== hoveredValue ? 0.2 : 1}
	>
		<circle fill={colorScale(domain)} r={tickSize} />
		<text class="fill-slate-500 text-sm" x="12" dy=".32em">{domain}</text>
	</g>
{/each}
