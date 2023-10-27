<script lang="ts">
	export let colorScale: any;
	export let tickSpacing: any;
	export let tickSize: any;

	const colorDomains: any = colorScale.domain().map((domainValue: any) => {
		return domainValue;
	});
</script>

{#each colorDomains as domain, i}
	<g transform={`translate(0, ${i * tickSpacing})`}>
		<circle fill={colorScale(domain)} r={tickSize} />
		<text class="fill-slate-500 text-sm" x="12" dy=".32em">{domain}</text>
	</g>
{/each}
