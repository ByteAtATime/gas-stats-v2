<script lang="ts">
	import { shortenTx } from '$lib/utils';
	import type { ChainProvider, Transaction } from '$lib/chains/types';

	export let tx: Transaction;
	export let chainProvider: ChainProvider;
</script>

<div class="mx-6 -mt-4 rounded-2xl bg-neutral p-8">
	The transaction with the highest gas price was
	<b class="underline"><a href={chainProvider.getTxExplorerUrl(tx.hash)} target="_blank">{shortenTx(tx.hash)}</a></b>
	with a gas price of <b>{(Number(tx.gasPrice) / 1e9).toFixed(3)} gwei</b>.
</div>