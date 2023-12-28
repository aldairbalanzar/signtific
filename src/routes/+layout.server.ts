import type { IUser } from '$lib/interfaces/user.js';

export const load = async ({ locals }) => {
	const { session, supabase } = locals;

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