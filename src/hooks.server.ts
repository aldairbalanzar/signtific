import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { IUser } from '$lib/interfaces/user';
import { createServerClient } from '@supabase/ssr'
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, options)
      },
      remove: (key, options) => {
        event.cookies.delete(key, options)
      },
    },
  });

  async function fetchUserData(): Promise<IUser> {
    console.log('fetching user data: ', event.locals.user?.id);
    const { data, error } = await event.locals.supabase.from('users')
    .select('*')
    .eq('id', session?.user.id)
    .single();
    
    if(error) console.log('error-fetchUserData: ', error);

    return data;
  }


  const {data: { session }} = await event.locals.supabase.auth.getSession();
  event.locals.session = session
  if(!event.locals.user) {
    event.locals.user = await fetchUserData();
  }
  console.log('user_id: ', event.locals.user?.id);


  if(event.url.pathname.startsWith('/admin')) {
    if(!event.locals.session || !event.locals.user?.is_admin) {
      throw redirect(303, '/');
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}