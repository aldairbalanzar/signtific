import type { Provider } from '@supabase/supabase-js';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider;
		if (provider) {
			const { data, error: err } = await locals.supabase.auth.signInWithOAuth({ provider });
			if (err) {
				console.log('error: ', err);
				return fail(400, { message: 'Something went wrong.' });
			}

			redirect(303, data.url);
		}
	}
};
