<script lang="ts">
	import type { TokenProvider } from '$lib/tokens/types';
	import { formatUsd } from '$lib/utils';

	export let totalTxFee: bigint;
	export let tokenPrice: number;
	export let token: TokenProvider;

	const totalTxFeeEth = token.numberToUnits(totalTxFee);
</script>

<div class="z-10 flex items-center rounded-2xl bg-info p-8 text-lg text-info-content">
	<div>
		You've spent a total of <b>{totalTxFeeEth} {token.symbol}</b> on transaction fees alone! That's
		worth about <b>{formatUsd(totalTxFeeEth * tokenPrice)}</b>. 🤯
	</div>
</div>
