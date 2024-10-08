<script lang="ts">
	import '../app.pcss';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import type { LayoutData } from './$types';
	import type { IUser } from '$lib/interfaces/user';
	import {
		initializeStores,
		AppShell,
		AppBar,
		LightSwitch,
		Avatar,
		Toast
	} from '@skeletonlabs/skeleton';

	export let data: LayoutData;

	initializeStores();
	let { session, supabase } = data;
	let user: IUser | null;
	$: user = data.user;

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(() => invalidateAll());
		const { subscription } = data;

		return () => subscription.unsubscribe();
	});
</script>

<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-[auto_1fr_auto]">
			<svelte:fragment slot="lead">
				{#if user}
					<div class="flex w-48 justify-between">
						<Avatar src={user.raw_user_meta_data.avatar_url} />
						<div class="flex flex-col justify-center">
							<p class="font-sans">{user.raw_user_meta_data.full_name}</p>
						</div>
					</div>
				{/if}
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<ul class="flex min-w-96 justify-between pr-10">
					{#if !session}
						<li class="w-1/4 font-sans"><a href="/login">Login</a></li>
						<li class="w-1/4 font-sans"><a href="/register">Register</a></li>
					{/if}

					{#if session}
						<li class="font-sans"><a href="/dashboard">Dashboard</a></li>

						{#if user?.is_admin}
							<li class="font-sans"><a href="/admin">Admin</a></li>
						{/if}

						<form action="/logout" method="POST">
							<button class="font-sans" type="submit">Logout</button>
						</form>
					{/if}

					<LightSwitch />
				</ul>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft"></svelte:fragment>
	<!-- (sidebarRight) -->
	<svelte:fragment slot="pageHeader"></svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<!-- (footer) -->
</AppShell>
