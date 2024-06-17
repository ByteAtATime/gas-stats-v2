<script lang="ts">
	import NetworksDropdown from '$lib/components/NetworksDropdown.svelte';
	import Fa from 'svelte-fa';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import { isAddress } from 'viem';
	import { CHAINS } from '$lib/chains/chains';
	import { goto } from '$app/navigation';
	import { getEnsAddress } from '$lib/ens';

	export let address = '';
	export let chain = '';

	let addressInput: HTMLInputElement;

	let isLoading = false;

	const handleSubmit = async () => {
		isLoading = true;

		if (!isAddress(address)) {
			const ensAddress = await getEnsAddress(address);
			if (ensAddress) {
				address = ensAddress;
			} else {
				addressInput.setCustomValidity('Invalid address');
				addressInput.reportValidity();

				isLoading = false;
				return;
			}
		}

		if (!chain || !CHAINS[chain]) {
			isLoading = false;
			return;
		}

		await goto(`/${address}?chain=${chain}`);

		isLoading = false;
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="flex gap-x-4">
	<input
		type="text"
		bind:value={address}
		placeholder="Enter an address or ENS..."
		class="input input-bordered flex-1"
		bind:this={addressInput}
		on:input={() => {
			addressInput.setCustomValidity('');
		}}
		required
	/>

	<NetworksDropdown bind:value={chain} />

	<button class="btn btn-square btn-primary" disabled={isLoading} aria-label="Search">
		{#if !isLoading}
			<Fa icon={faSearch} size="1.5x" />
		{:else}
			<div class="loading" />
		{/if}
	</button>
</form>
