<script lang="ts">
	import type { ChainProvider, Transaction } from '$lib/chains/types';
	import TxFeeCard from './cards/TxFeeCard.svelte';
	import AverageTxFeeCard from './cards/AverageTxFeeCard.svelte';
	import HighestTxFee from './cards/HighestTxFee.svelte';
	import { formatEther, shortenTx, totalTxFeeStats } from '$lib/utils';
	import { DateTime } from 'luxon';

	export let transactions: Transaction[];
	export let chainProvider: ChainProvider;
	export let tokenPrice: number;

	const txsByGasPrice = transactions.sort((a, b) => Number(b.gasPrice - a.gasPrice));
	const txWithHighestGasPrice = txsByGasPrice[0];

	const txsByTxFee = transactions.sort((a, b) => {
		const txFeeA = BigInt(a.gasUsed) * BigInt(a.gasPrice);
		const txFeeB = BigInt(b.gasUsed) * BigInt(b.gasPrice);

		return Number(txFeeB - txFeeA);
	});

	const { totalTxFee, totalTxFeeUsd } = totalTxFeeStats(
		transactions,
		tokenPrice,
		chainProvider.token
	);

	let rowsToShow = 100;

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

		if (scrollTop + clientHeight >= scrollHeight - clientHeight / 2) {
			rowsToShow += 100;
		}
	};
</script>

<svelte:window on:scroll={handleScroll} />

<div class="my-4 flex max-w-screen-md flex-col items-stretch md:flex-row [&>*]:flex-1">
	<AverageTxFeeCard {totalTxFeeUsd} transactionCount={transactions.length} />

	<TxFeeCard token={chainProvider.token} {tokenPrice} {totalTxFee} />

	<HighestTxFee {chainProvider} tx={txWithHighestGasPrice} />
</div>

<div class="w-full max-w-screen-lg overflow-x-auto">
	<table class="table table-zebra">
		<!-- head -->
		<thead>
			<tr>
				<th>Tx Hash</th>
				<th>Timestamp</th>
				<th>Gas Price (Gwei)</th>
				<th>Gas Used</th>
				<th>Tx Fee</th>
				<th>Value</th>
				<th>Gas-to-Value Ratio</th>
			</tr>
		</thead>
		<tbody>
			{#each txsByTxFee.slice(0, rowsToShow) as tx (tx.hash)}
				{@const txFeeEth = chainProvider.token.numberToUnits(BigInt(tx.gasUsed) * tx.gasPrice)}

				<tr>
					<td>
						<a
							class="whitespace-nowrap font-mono underline"
							href={chainProvider.getTxExplorerUrl(tx.hash)}
						>
							{shortenTx(tx.hash)}
						</a>
					</td>
					<td class="whitespace-nowrap">
						{DateTime.fromSeconds(tx.timestamp)
							.setLocale('en-US')
							.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
					</td>
					<td>{(Number(tx.gasPrice) / 10e9).toFixed(3)}</td>
					<td>{tx.gasUsed.toLocaleString('en-US')}</td>
					<td>
						<b class="whitespace-nowrap">
							{formatEther(txFeeEth, 'precise')}
							{chainProvider.token.symbol}
						</b>
						<br />
						<span class="whitespace-nowrap">(&approx; ${(txFeeEth * tokenPrice).toFixed(2)})</span>
					</td>
					<td
						>{formatEther(chainProvider.token.numberToUnits(tx.value), 'compact')}
						{chainProvider.token.symbol}</td
					>
					<td>
						{#if tx.value === 0n}
							&infin;
						{:else}
							{(((Number(tx.gasUsed) * Number(tx.gasPrice)) / Number(tx.value)) * 100).toFixed(2)}%
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
