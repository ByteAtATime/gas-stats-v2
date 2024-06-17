<script lang="ts">
	export let transactionCount: number;
	export let totalTxFeeUsd: number;

	const averageTxFee = (totalTxFeeUsd / transactionCount).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	});
</script>

<div class="mx-6 -mb-4 rounded-2xl bg-neutral p-8 md:!my-6 md:-mr-4 md:mb-0 md:ml-0">
	Averaged over your <b>{transactionCount}</b> transactions sent, you've spent about {averageTxFee}
	per transaction.
</div>
