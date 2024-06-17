<div class="my-4 flex w-full max-w-screen-md flex-col items-stretch md:flex-row">
	<div
		class="mx-6 -mb-4 flex flex-1 flex-col gap-y-2 rounded-2xl bg-neutral p-8 md:!my-6 md:-mr-4 md:mb-0 md:ml-0"
	>
		<div class="skeleton h-4 w-full" />
		<div class="skeleton h-4 w-3/5" />
		<div class="skeleton h-4 w-4/5" />
	</div>

	<div
		class="z-10 flex flex-1 flex-col justify-center gap-y-2 rounded-2xl bg-info p-8 text-lg text-info-content"
	>
		<div class="skeleton h-6 w-full" />
		<div class="skeleton h-6 w-3/5" />
		<div class="skeleton h-6 w-4/5" />
	</div>

	<div
		class="mx-6 -mt-4 flex flex-1 flex-col gap-y-2 rounded-2xl bg-neutral p-8 md:!my-6 md:-ml-4 md:mr-0 md:mt-0"
	>
		<div class="skeleton h-4 w-full" />
		<div class="skeleton h-4 w-3/5" />
		<div class="skeleton h-4 w-4/5" />
	</div>
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
			<tr style="visibility: collapse;">
				<td class="whitespace-nowrap font-mono">0x000000…000000</td>
				<td class="whitespace-nowrap">Jan 31, 2024, 11:12:13 AM</td>
				<td>1.234</td>
				<td>123,456</td>
				<td>
					<b class="whitespace-nowrap">1.234567 ETH</b>
					<br />
					<span class="whitespace-nowrap">(&approx; $1,234.56)</span>
				</td>
				<td>1.2345 ETH</td>
				<td>12.34%</td>
			</tr>
			{#each Array(5) as _}
				<tr>
					<td><div class="skeleton h-4" /></td>
					<td><div class="skeleton h-4" /></td>
					<td><div class="skeleton h-4" /></td>
					<td><div class="skeleton h-4" /></td>
					<td><div class="skeleton h-4" /></td>
					<td><div class="skeleton h-4" /></td>
					<td><div class="skeleton h-4" /></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
