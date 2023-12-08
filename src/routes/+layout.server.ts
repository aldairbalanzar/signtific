import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { IUser } from '$lib/interfaces/user.js';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ locals }) => {
	const { session } = locals;
	const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: {fetch},
    serverSession: session
  });

	async function fetchUserData(): Promise<IUser> {
		const res = await supabase.from('users')
		.select('*')
		.eq('id', session?.user.id)
		.single()

		return res.data
	}
	
	return {
		session,
		user: fetchUserData(),
	};
};