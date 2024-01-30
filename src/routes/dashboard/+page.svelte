<script lang="ts">
import Card from "$lib/components/Card.svelte";
export let data;
const { signs, supabase } = data;

$: playingId = '';
</script>

<main class="w-full flex justify-evenly flex-wrap pt-6">
{#if signs?.length}
  {#each signs as sign}
    <Card
    {sign}
    {supabase}
    bind:playingId={playingId}
    />
  {/each}
{/if}
</main>