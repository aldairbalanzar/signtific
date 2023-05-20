import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions =  {
    register: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());
        const newUser = {
            email: body.email as string,
            password: body.password as string,
        };
        const { data, error: err } = await locals.supabase.auth.signUp(newUser);

        if(err) {
            if(err instanceof AuthApiError && err.status === 400) {
                return fail(400, { error: "Invalid email or password." });
            } else {
                return fail(500, { error: "Server error, please try again later." });
            }
        }
 
        throw redirect(303, "/")
    }
}
