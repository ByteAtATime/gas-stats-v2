<script lang="ts">
	import type { ChainProvider, Transaction } from '$lib/chains/types';
	import TxFeeCard from './cards/TxFeeCard.svelte';
	import AverageTxFeeCard from './cards/AverageTxFeeCard.svelte';
	import HighestTxFee from './cards/HighestTxFee.svelte';

	export let transactions: Transaction[];
	export let chainProvider: ChainProvider;
	export let tokenPrice: number;

	const totalTxFee = transactions.reduce((acc, tx) => acc + tx.gasPrice * BigInt(tx.gasUsed), 0n);
	const totalTxFeeEth = chainProvider.token.numberToUnits(totalTxFee);
	const totalTxFeeUsd = totalTxFeeEth * tokenPrice;

	const txByGasPrice = transactions.sort((a, b) => Number(b.gasPrice - a.gasPrice));
	const txWithHighestGasPrice = txByGasPrice[txByGasPrice.length - 1];
</script>

<div class="flex flex-col items-center">
	<AverageTxFeeCard transactionCount={transactions.length} totalTxFeeUsd={totalTxFeeUsd} />

	<TxFeeCard {totalTxFee} token={chainProvider.token} {tokenPrice} />

	<HighestTxFee tx={txWithHighestGasPrice} chainProvider={chainProvider} />
</div>
