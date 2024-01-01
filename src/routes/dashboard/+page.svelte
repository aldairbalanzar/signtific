<script lang="ts">
import Card from "$lib/components/Card.svelte";
export let data;
const { signs, supabase } = data;

$: playingId = '';
</script>

<main class="container">
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

<style>
  .container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
</style>