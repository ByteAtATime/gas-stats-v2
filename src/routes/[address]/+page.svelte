<script lang="ts">
	import { page } from '$app/stores';
	import { CHAINS } from '$lib/chains/chains';

	const address = $page.params.address;
	const chain = $page.url.searchParams.get('chain') ?? 'mainnet';
	const blocksToLoad = $page.url.searchParams.get('blocks');

	const chainProvider = CHAINS[chain];

	let blockNumber: bigint | null = null;
	const blockNumberPromise = chainProvider.getBlockNumber().then((_blockNumber) => {
		blockNumber = _blockNumber;
	});
</script>

{#await blockNumberPromise}
	<p>Loading...</p>
{:then _}
	<p>Block number: {blockNumber}</p>
{:catch error}
	<p>Error: {error.message}</p>
{/await}
