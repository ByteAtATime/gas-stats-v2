<script lang="ts">
	import { formatEther, shortenTx } from '$lib/utils';
	import { DateTime } from 'luxon';
	import type { Transaction } from '$lib/chains/types.js';
	import type { ChainProvider } from '$lib/chains/types.js';

	export let transactions: Transaction[];
	export let chainProvider: ChainProvider;
	export let tokenPrice: number;

	const txsByTxFee = transactions.sort((a, b) => {
		const txFeeA = BigInt(a.gasUsed) * BigInt(a.gasPrice);
		const txFeeB = BigInt(b.gasUsed) * BigInt(b.gasPrice);

		return Number(txFeeB - txFeeA);
	});

	let rowsToShow = 100;

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

		if (scrollTop + clientHeight >= scrollHeight - clientHeight / 2) {
			rowsToShow += 100;
		}
	};
</script>

<svelte:window on:scroll={handleScroll} />

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
						<span class="whitespace-nowrap"
							>(&approx; {(txFeeEth * tokenPrice).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD'
							})})</span
						>
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
