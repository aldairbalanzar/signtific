
<script lang='ts'>
import Card from "$lib/components/Card.svelte";
import type { PageData } from "./$types";
 
export let data: PageData;
</script>

{#if data.session}
<p>welcome, { data.session.user.email }</p>
<form action="/logout" method="POST">
    <button class="logout-btn">Logout</button>
</form>
<Card />

{:else}
<button class="login-btn">
   <a href="/login">Login</a>
</button>
<button class="register-btn">
    <a href="/register">Register</a>
</button>

{/if}
  
<style lang="postcss">
:global(html) {
    background-color: theme(colors.gray.300);
}
</style>