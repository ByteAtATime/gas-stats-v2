<script lang="ts">
	import type { ChainProvider, Transaction } from '$lib/chains/types';
	import TxFeeCard from './cards/TxFeeCard.svelte';
	import AverageTxFeeCard from './cards/AverageTxFeeCard.svelte';
	import HighestTxFee from './cards/HighestTxFee.svelte';
	import { totalTxFeeStats } from '$lib/utils';

	export let transactions: Transaction[];
	export let chainProvider: ChainProvider;
	export let tokenPrice: number;

	const txsByGasPrice = transactions.sort((a, b) => Number(b.gasPrice - a.gasPrice));
	const txWithHighestGasPrice = txsByGasPrice[0];

	const { totalTxFee, totalTxFeeUsd } = totalTxFeeStats(
		transactions,
		tokenPrice,
		chainProvider.token
	);
</script>

<div class="my-4 flex max-w-screen-md flex-col items-stretch md:flex-row">
	<AverageTxFeeCard transactionCount={transactions.length} {totalTxFeeUsd} />

	<TxFeeCard {totalTxFee} token={chainProvider.token} {tokenPrice} />

	<HighestTxFee tx={txWithHighestGasPrice} {chainProvider} />
</div>
