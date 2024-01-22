import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals }) => {
  const { error: err } = await locals.supabase.auth.signOut();

  if(err) { error(500, 'Issue with logging out.');}

  redirect(303, '/');
};