import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
  if(locals.session) {
    throw redirect(303, `${url.origin}/dashboard`);
  }
};