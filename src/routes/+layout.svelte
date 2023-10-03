<script lang="ts">
	import { onMount } from "svelte";
  import { supabaseClient } from "$lib/supabase.js";
	import { invalidateAll } from "$app/navigation";

  export let data;
  console.log('data: ', data);

  onMount(() => {
    const { data } = supabaseClient.auth.onAuthStateChange(() => invalidateAll());
    const { subscription } = data;

    return () => subscription.unsubscribe();
  })

</script>

<nav>
  <ul>
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
  </ul>
</nav>

<slot/>