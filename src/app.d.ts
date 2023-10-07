// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { Session, SupabaseClient } from "@supabase/supabase-js"
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			session: Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
