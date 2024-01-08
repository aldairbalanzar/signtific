import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { IUser } from '$lib/interfaces/user';
import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';

export const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {event.cookies.set(key, value, options)},
      remove: (key, options) => {event.cookies.delete(key, options)},
    },
  });

  const {data: { session }} = await event.locals.supabase.auth.getSession();
  event.locals.session = session

  async function fetchUserData(): Promise<IUser> {
    const { data, error } = await event.locals.supabase.from('users')
    .select('*')
    .eq('id', session?.user.id)
    .single();
    
    if(error) console.log('error-fetchUserData: ', error);

    return data;
  }

  if(event.locals.session) {
    event.locals.user = await fetchUserData();
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  });
};