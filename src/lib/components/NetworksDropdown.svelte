<script lang="ts">
	import Select from 'svelte-select';
	import { CHAINS } from '$lib/chains/chains';

	export let value: string | null;

	const networks = Object.keys(CHAINS).filter((chain) => chain !== 'mock');
</script>

<Select
	bind:justValue={value}
	{value}
	class="z-20 !w-fit min-w-60 text-black"
	items={networks}
	placeholder="Choose a network..."
	required
	showChevron={!value}
>
	<div class="flex items-center" let:selection slot="selection">
		{@const chain = CHAINS[selection.value]}

		<img alt={selection} class="mr-2 h-6 w-6" src={chain.iconPath} />
		{chain.name}
	</div>

	<div class="flex items-center" let:item slot="item">
		{@const chain = CHAINS[item.value]}

		<img alt={item} class="mr-2 h-6 w-6" src={chain.iconPath} />
		{chain.name}
	</div>
</Select>
