<script lang="ts">
	import { getContext } from 'svelte';
	import * as Select from '$lib/components/ui/select';
	import { dataStore } from '$lib/stores/data-store';

	// grab the chart data from the store
	const chartData: any = getContext('irisDataset');
</script>

<div class="flex pl-4">
	<!-- X Axis Menu -->
	<Select.Root
		onSelectedChange={(item) => dataStore.updateSelectedX(item?.value)}
		selected={$chartData.selectedX}
	>
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

	<!-- Y Axis Menu -->
	<Select.Root
		onSelectedChange={(item) => dataStore.updateSelectedY(item?.value)}
		selected={$chartData.selectedY}
	>
		<div class="flex">
			<Select.Label>Y:</Select.Label>
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
</div>
