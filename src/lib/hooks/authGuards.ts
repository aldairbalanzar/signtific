import { redirect, type Handle } from '@sveltejs/kit';

export const authGuards: Handle = async ({ event, resolve }) => {
    const isAdminPage = event.url.pathname.startsWith('/admin');
    const {locals: { user, session }} = event;

    if(isAdminPage) {
      if(!session || !user?.is_admin) {
        console.log(`${user?.id} you are not allowed`);
        throw redirect(303, '/');
      }
    }

    return await resolve(event);
};