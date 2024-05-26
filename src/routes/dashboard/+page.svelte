<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	export let data;
	const { signs, supabase } = data;

	$: playingId = '';
</script>

<main class="flex w-full flex-wrap justify-evenly pt-6">
	{#if signs?.length}
		{#each signs as sign}
			<Card {sign} {supabase} bind:playingId />
		{/each}
	{/if}
</main>
