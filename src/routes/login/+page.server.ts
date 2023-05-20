import { AuthApiError } from "@supabase/supabase-js";
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    login: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());
        const credentials = {
            email: body.email as string,
            password: body.password as string,
        };
        const { data, error: err } = await locals.supabase.auth.signInWithPassword(credentials);

        if(err) {
            if(err instanceof AuthApiError && err.status === 400) {
                return fail(400, { error: "Invalid credentials." });
            } else {
                return fail(500, { error: "Server error, please try again later."})
            }
        }

        throw redirect(303, "/")
    }
};