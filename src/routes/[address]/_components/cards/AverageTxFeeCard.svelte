<script lang="ts">
	export let transactionCount: number;
	export let totalTxFeeUsd: number;

	const averageTxFee = totalTxFeeUsd / transactionCount;
</script>

<div class="mx-6 -mb-4 rounded-2xl bg-neutral p-8">
	Averaged over your <b>{transactionCount}</b> transactions sent,
	you've spent about ${averageTxFee.toFixed(2)} per transaction.
</div>