<script lang='ts'>
import Card from "$lib/components/Card.svelte";
import type { PageData } from "./$types";
 
export let data: PageData;
</script>

<main class="container">
{#if data.session}
    <p class="greeting">welcome, { data.session.user.email }</p>
    <Card />

{:else}
    <h1 class="page-title">Signtific</h1>
	<div class="actions-container">
        <div class="link-btn-container">
            <a class="link-btn login" href="/login">Login</a>
        </div>
        <div class="link-btn-container">
            <a class="link-btn register" href="/register">Register</a>
        </div>
    </div>
{/if}
</main>

<style lang="postcss">
.container {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .greeting {
        width: 100%;
        color: aliceblue;
        text-align: center;
    }

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
        
        .link-btn-container {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            .link-btn {
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
            .link-btn:hover {
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