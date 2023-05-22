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
<main class="container">
    <h1 class="page-title">Signtific</h1>
	<div class="actions-container">
        <div class="btn-container">
            <a class="btn login" href="/login">Login</a>
        </div>
        <div class="btn-container">
            <a class="btn register" href="/register">Register</a>
        </div>
    </div>
</main>
{/if}

<style lang="postcss">
.container {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .page-title {
        width: 100%;
        font-size: 2.4rem;
        text-align: center;
        color: aliceblue;
        padding: 3% 0;
    }
    .actions-container {
        width: 33%;
        display: flex;
        flex-wrap: wrap;
        height: 500px;
        border: 2px solid salmon;
        border-radius: 5px;
        justify-content: space-evenly;
        
        .btn-container {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            .btn {
                width: 50%;
                border: none;
                border-radius: 3px;
                padding: 3% 0;
                color: hsl(220 20% 14%);
                font-size: 1.6rem;
                text-align: center;
                text-decoration: none;
                transition: .35s;
            }
            .btn:hover {
                background-color: aliceblue;
                color: hsl(220 20% 14%);
            }

            .login {
                background-color: rgb(61, 229, 255);
            }
            .register {
                background-color: rgb(246, 126, 255);
            }
        }
    }
}
</style>