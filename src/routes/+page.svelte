
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
	<div class="container">
        <button>
            <a href="/login">Login</a>
        </button>
    </div>
    <div>
        <button>
            <a href="/register">Register</a>
        </button>
    </div>
{/if}