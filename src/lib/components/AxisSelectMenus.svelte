<script lang="ts">
	import { getContext } from 'svelte';
	import * as Select from '$lib/components/ui/select';
	import { dataStore } from '$lib/stores/data-store';

	// grab the chart data from the store
	const chartData: any = getContext('irisDataset');

	export let attributes: any;
	export let xAxisLabel: any;
	export let yAxisLabel: any;
</script>

<div class="flex pl-4">
	<!-- X Axis Menu -->
	<Select.Root onSelectedChange={(item) => dataStore.updateSelectedX(item?.value)}>
		<div class="flex">
			<Select.Label>X:</Select.Label>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder={xAxisLabel} />
			</Select.Trigger>
			<Select.Content>
				{#each attributes as option}
					<Select.Item value={option.value}>{option.label}</Select.Item>
				{/each}
			</Select.Content>
		</div>
	</Select.Root>

	<!-- Y Axis Menu -->
	<Select.Root onSelectedChange={(item) => dataStore.updateSelectedY(item?.value)}>
		<div class="flex">
			<Select.Label>Y:</Select.Label>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder={yAxisLabel} />
			</Select.Trigger>
			<Select.Content>
				{#each attributes as option}
					<Select.Item value={option.value}>{option.label}</Select.Item>
				{/each}
			</Select.Content>
		</div>
	</Select.Root>
</div>
