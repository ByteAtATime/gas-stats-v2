<script lang="ts">
	import NetworksDropdown from '$lib/components/NetworksDropdown.svelte';
	import Fa from 'svelte-fa';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import { isAddress } from 'viem';
	import { CHAINS } from '$lib/chains/chains';
	import { goto } from '$app/navigation';

	let address = '';
	let chain = '';

	let addressInput: HTMLInputElement;

	const handleSubmit = () => {
		if (!isAddress(address)) {
			addressInput.setCustomValidity('Invalid address');
			addressInput.reportValidity();
			return;
		}

		if (!chain || !CHAINS[chain]) return;

		goto(`/${address}?chain=${chain}`);
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="flex gap-x-4">
	<input
		type="text"
		bind:value={address}
		placeholder="Enter an address..."
		class="input input-bordered flex-1"
		bind:this={addressInput}
		on:input={() => {
			if (isAddress(address)) {
				addressInput.setCustomValidity('');
			}
		}}
		required
	/>

	<NetworksDropdown bind:value={chain} />

	<button class="btn btn-square btn-primary">
		<Fa icon={faSearch} size="1.5x" />
	</button>
</form>
