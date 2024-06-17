<script lang="ts">
	import { page } from '$app/stores';
	import { CHAINS } from '$lib/chains/chains';
	import Stats from './_components/Stats.svelte';
	import { shortenAddress } from '$lib/utils';
	import type { Transaction } from '$lib/chains/types';
	import Skeleton from './_components/Skeleton.svelte';
	import Search from '$lib/components/Search.svelte';
	import { getEnsName } from '$lib/ens';

	$: address = $page.params.address;
	$: chain = $page.url.searchParams.get('chain') ?? 'mainnet';

	$: chainProvider = CHAINS[chain];

	$: loadData = async (): Promise<[Transaction[], number]> => {
		const blockNumber = await chainProvider.getBlockNumber();

		const transactions = chainProvider.getTransactions(0n, blockNumber + 100n, address);

		const tokenPrice = chainProvider.token.getPrice();

		return Promise.all([transactions, tokenPrice]);
	};

	$: ensNamePromise = getEnsName(address);
</script>

<div class="mx-auto mt-4 w-full max-w-screen-md px-4">
	<Search {address} {chain} />
</div>

<div class="flex min-h-screen flex-col items-center px-4 py-8">
	<h1 class="text-3xl font-bold">
		Stats for <span class="whitespace-nowrap">
			{#await ensNamePromise}
				{shortenAddress(address)}
			{:then ensName}
				{ensName ?? shortenAddress(address)}
			{:catch _}
				{shortenAddress(address)}
			{/await}
		</span>
	</h1>

	{#await loadData()}
		<Skeleton />
	{:then [transactions, tokenPrice]}
		{#if transactions.length === 0}
			<p>No transactions found for this address.</p>
		{:else}
			<Stats {transactions} {chainProvider} {tokenPrice} />
		{/if}
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>
