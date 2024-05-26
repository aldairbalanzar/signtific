import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';

export const load = async ({ data, fetch, depends }) => {
	depends('supabase:auth');
	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: { fetch },
		cookies: {
			get(key) {
				if (!isBrowser()) return JSON.stringify(data.session);
				const cookie = parse(document.cookie);

				return cookie[key];
			}
		}
	});

	async function fetchSession() {
		const {
			data: { session }
		} = await supabase.auth.getSession();

		return session;
	}

	return {
		session: await fetchSession(),
		user: data.user,
		supabase
	};
};
