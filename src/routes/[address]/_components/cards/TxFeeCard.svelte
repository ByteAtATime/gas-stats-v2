<script lang="ts">
	import type { TokenProvider } from '$lib/tokens/types';

	export let totalTxFee: bigint;
	export let tokenPrice: number;
	export let token: TokenProvider

	const totalTxFeeEth = token.numberToUnits(totalTxFee);
	const totalTxFeeUsd = totalTxFeeEth * tokenPrice;
</script>

<div class="z-10 rounded-2xl bg-info p-8 text-info-content">
	You've spent a total of <b>{totalTxFeeEth} {token.symbol}</b> on transaction fees
	alone! That's worth about <b>${totalTxFeeUsd.toFixed(2)}</b>. 🤯
</div>