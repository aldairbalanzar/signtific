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

<slot />