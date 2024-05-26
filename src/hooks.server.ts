import { sequence } from '@sveltejs/kit/hooks';
import { supabase } from '$lib/hooks/supabase';
import { authGuards } from '$lib/hooks/authGuards';

export const handle = sequence(supabase, authGuards);
