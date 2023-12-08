import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
  if(locals.session && locals.user) {
    throw redirect(303, `${url.origin}/dashboard`);
  }
};