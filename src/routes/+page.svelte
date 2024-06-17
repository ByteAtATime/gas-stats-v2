<script lang="ts">
	import Search from '$lib/components/Search.svelte';
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<h1 class="text-4xl font-bold">Gas Stats</h1>
	<p>How much money have you spent on gas fees? Find out by entering your address below.</p>

	<div class="mt-4 w-full max-w-screen-md">
		<Search />
	</div>
</div>
