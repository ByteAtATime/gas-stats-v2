<script lang="ts">
	import { page } from '$app/stores';
	import { CHAINS } from '$lib/chains/chains';
	import type { Transaction } from '$lib/chains/types';
	import Stats from './_components/Stats.svelte';
	import { shortenAddress } from '$lib/utils';

	const address = $page.params.address;
	const chain = $page.url.searchParams.get('chain') ?? 'mainnet';
	const blocksToLoad = $page.url.searchParams.get('blocks');

	const chainProvider = CHAINS[chain];

	let blockNumber: bigint | null = null;
	const blockNumberPromise = chainProvider.getBlockNumber().then((_blockNumber) => {
		blockNumber = _blockNumber;
	});

	$: startBlock = blockNumber
		? blocksToLoad // blockNumber has loaded
			? BigInt(blockNumber) - BigInt(blocksToLoad) // if we provide a block number, we can calculate the start block
			: 0n // otherwise, just get all of them
		: null; // not loaded yet

	let transactions: Transaction[] | null = null;

	$: transactionsPromise =
		startBlock !== null && blockNumber !== null
			? chainProvider
					.getTransactions(startBlock, blockNumber + 100n, address)
					.then((_transactions) => {
						transactions = _transactions;
					})
			: Promise.resolve(null);

	const tokenPricePromise = chainProvider.token.getPrice();
</script>

<div class="flex min-h-screen flex-col items-center justify-center px-4">
	<h1 class="text-3xl font-bold">
		Stats for <span class="whitespace-nowrap">{shortenAddress(address)}</span>
	</h1>

	{#await Promise.all([blockNumberPromise, transactionsPromise, tokenPricePromise])}
		<p>Loading...</p>
	{:then [,, tokenPrice]}
		{#if transactions}
			<Stats {transactions} {chainProvider} {tokenPrice} />
		{/if}
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
