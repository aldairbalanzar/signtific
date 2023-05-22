<script lang="ts">
	import { onMount } from 'svelte';
    import '../app.postcss';
	import { invalidateAll } from '$app/navigation';
    import type { LayoutData } from './$types';


    export let data: LayoutData;

    onMount(() => {
        const { data: { subscription }} = data.supabase.auth.onAuthStateChange(() => {
            invalidateAll();
        });

        return () => { subscription.unsubscribe(); }
    })
</script>

<div class="app-container">
    <nav class="navbar">
        <ul class="links-container">
            <li><a class="nav-link" href="/">Home</a></li>
            <li><a class="nav-link" href="/login">Login</a></li>
            <li><a class="nav-link" href="/register">Register</a></li>
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
            }
        }
    }
</style>