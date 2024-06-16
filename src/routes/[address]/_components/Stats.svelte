<script lang="ts">
	import type { ChainProvider, Transaction } from '$lib/chains/types';
	import { shortenTx } from '$lib/utils';

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
	<div class="mx-6 -mb-4 rounded-2xl bg-neutral p-8">
		Averaged over your <b>{transactions.length}</b> transactions sent, you've spent about ${(
			totalTxFeeUsd / transactions.length
		).toFixed(2)} per transaction.
	</div>

	<div class="z-10 rounded-2xl bg-info p-8 text-info-content">
		You've spent a total of <b>{totalTxFeeEth} {chainProvider.token.symbol}</b> on transaction fees
		alone! That's worth about <b>${totalTxFeeUsd.toFixed(2)}</b>. 🤯
	</div>

	<div class="mx-6 -mt-4 rounded-2xl bg-neutral p-8">
		The transaction with the highest gas price was <b class="underline"
			><a target="_blank" href={chainProvider.getTxExplorerUrl(txWithHighestGasPrice.hash)}
				>{shortenTx(txWithHighestGasPrice.hash)}</a
			></b
		>
		with a gas price of <b>{(Number(txWithHighestGasPrice.gasPrice) / 1e9).toFixed(3)} gwei</b>.
	</div>
</div>
