<script lang="ts">
	import { page } from '$app/stores';
	import { CHAINS } from '$lib/chains/chains';
	import Stats from './_components/Stats.svelte';
	import { shortenAddress } from '$lib/utils';
	import type { Transaction } from '$lib/chains/types';

	const address = $page.params.address;
	const chain = $page.url.searchParams.get('chain') ?? 'mainnet';
	const blocksToLoad = $page.url.searchParams.get('blocks');

	const chainProvider = CHAINS[chain];

	const loadData = async (): Promise<[Transaction[], number]> => {
		const blockNumber = await chainProvider.getBlockNumber();
		const startBlock = blocksToLoad ? BigInt(blockNumber) - BigInt(blocksToLoad) : 0n;

		const transactions = chainProvider.getTransactions(startBlock, blockNumber + 100n, address);

		const tokenPrice = chainProvider.token.getPrice();

		return Promise.all([transactions, tokenPrice]);
	};
</script>

<div class="flex min-h-screen flex-col items-center justify-center px-4">
	<h1 class="text-3xl font-bold">
		Stats for <span class="whitespace-nowrap">{shortenAddress(address)}</span>
	</h1>

	{#await loadData()}
		<p>Loading...</p>
	{:then [transactions, tokenPrice]}
		{#if transactions}
			<Stats {transactions} {chainProvider} {tokenPrice} />
		{/if}
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>