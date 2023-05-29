<script lang="ts">
	import { onMount } from 'svelte';
    import '../app.postcss';
	import { invalidateAll } from '$app/navigation';
    import type { LayoutData } from './$types';

    export let data: LayoutData;
    const { session } = data;
    
    onMount(() => {
        const { data: { subscription }} = data.supabase.auth.onAuthStateChange(() => {
            invalidateAll();
        });
        
        return () => { subscription.unsubscribe(); }
    });
</script>

<div class="app-container">
    <nav class="navbar">
        <ul class="links-container">
            <li><a class="nav-link" href="/">Home</a></li>

            {#if session?.user.role  === 'admin'}
                <li><a class="nav-link" href="/admin">Admin</a></li>
            {/if}

            {#if !session}
                <li><a class="nav-link" href="/login">Login</a></li>
                <li><a class="nav-link" href="/register">Register</a></li>
            {:else}
                <form class="form" action="/logout" method="POST">
                    <button class="logout"><li class="nav-link">Logout</li></button>
                </form>
            {/if}
        </ul>
    </nav>
    
    <slot></slot>
</div>

<style lang="postcss">
    .app-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .navbar {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            border: 2px solid lavender;

            .links-container {
                width: 30%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-evenly;
                padding: 1% 1%;

                .nav-link {
                    font-size: 1.2rem;
                    color: aliceblue;
                    text-decoration: none;
                }

                .form {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .logout {
                        border: none;
                        background-color: transparent;
                        font-size: 1.2rem;
                        color: aliceblue;
                        text-decoration: none;
                        padding: 0;
                        all: unset;
                    }
                    .logout:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>