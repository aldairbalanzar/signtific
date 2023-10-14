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

<nav class="navbar">
  <ul class="links-container">
    <li class="link"><a href="/login">Login</a></li>
    <li class="link"><a href="/register">Register</a></li>
    {#if session}
    <form action="/logout" method="POST">
      <button class="logout-btn" type="submit">Logout</button>
    </form>
    {/if}
  </ul>
</nav>

<slot/>

<style>
  :global(body) {
    background-color: lightgrey;
  }
  .navbar {
    display: flex;
    width: 100%;
    background-color: lightslategrey;
  }

  .links-container{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .links-container>.link {
    width: 30%;
    list-style: none;
  }
  .links-container>.link>a {
    text-decoration: none;
    color: black;
  }
  :hover.links-container>.link>a {
    cursor: pointer;
  }

  form>.logout-btn {
    border: none;
    background-color: #ffffff00;
  }
  :hover form>.logout-btn {
    cursor: pointer;

  }
</style>