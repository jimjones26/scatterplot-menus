<script lang="ts">
	import { getContext } from 'svelte';
	import * as Select from '$lib/components/ui/select';
	import { dataStore } from '$lib/stores/data-store';

	// grab the chart data from the store
	const chartData: any = getContext('irisDataset');
</script>

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
