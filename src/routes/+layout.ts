import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ data, fetch, depends }) => {
  depends('supabase:auth');
  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: {fetch},
    serverSession: data.session
  });

  async function fetchSession() {
    const { data: { session }} = await supabase.auth.getSession();

    return session
  }

  return { 
    session: fetchSession(),
    user: data.user,
    supabase
  }
};