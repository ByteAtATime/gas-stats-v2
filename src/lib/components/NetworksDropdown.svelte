<script lang="ts">
	import Select from 'svelte-select';
	import { CHAINS } from '$lib/chains/chains';

	export let value: string | null;

	const networks = Object.keys(CHAINS);
</script>

<Select
	items={networks}
	placeholder="Choose a network..."
	required
	class="z-20 !w-fit min-w-60 text-black"
	bind:justValue={value}
	showChevron={!value}
>
	<div slot="selection" let:selection class="flex items-center">
		{@const chain = CHAINS[selection.value]}

		<img src={chain.iconPath} alt={selection} class="mr-2 h-6 w-6" />
		{chain.name}
	</div>

	<div slot="item" let:item class="flex items-center">
		{@const chain = CHAINS[item.value]}

		<img src={chain.iconPath} alt={item} class="mr-2 h-6 w-6" />
		{chain.name}
	</div>
</Select>
