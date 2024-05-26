// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { IUser } from '$lib/interfaces/user';
import { Session, SupabaseClient } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			session: Session | null;
			user: IUser | null;
		}
		interface PageData {
			user: IUser;
		}
		// interface Platform {}
		// interface Platform {}
	}
}

export {};
