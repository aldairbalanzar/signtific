import type { Actions } from "./$types";

export const actions: Actions = {
    upload: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        const supabase = locals.supabase;
    }
};