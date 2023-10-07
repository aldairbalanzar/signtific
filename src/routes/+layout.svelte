<script lang="ts">
	import { onMount } from "svelte";
	import { invalidateAll } from "$app/navigation";

  export let data;
  const { session, supabase } = data;

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange(() => invalidateAll());
    const { subscription } = data;

    return () => subscription.unsubscribe();
  })

</script>

<nav>
  <ul>
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
    {#if session}
    <form action="/logout" method="POST">
      <button type="submit">Logout</button>
    </form>
    {/if}
  </ul>
</nav>

<slot/>