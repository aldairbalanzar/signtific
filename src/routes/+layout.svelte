<script lang="ts">
	import { onMount } from "svelte";
	import { invalidateAll } from "$app/navigation";
	import type { LayoutData } from "./$types";
	import type { IUser } from "$lib/interfaces/user";

  export let data: LayoutData;
  let { session, supabase } = data;
  let user: IUser;
  $: user = data.user;
  
  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange(() => invalidateAll());
    const { subscription } = data;

    return () => subscription.unsubscribe();
  })

</script>
<nav class="navbar">
  <ul class="links-container">
    {#if !session}
    <li class="link"><a href="/login">Login</a></li>
    <li class="link"><a href="/register">Register</a></li>
    {/if}
    {#if session}
    <li class="link"><a href="/dashboard">Dashboard</a></li>
      {#if user?.is_admin}
      <li class="link"><a href="/admin">Admin</a></li>
      {/if}
    <form action="/logout" method="POST">
      <button class="logout-btn" type="submit">Logout</button>
    </form>
    {/if}
  </ul>

  {#if user}
    <div>{ user.raw_user_meta_data.full_name }</div>
  {/if}
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