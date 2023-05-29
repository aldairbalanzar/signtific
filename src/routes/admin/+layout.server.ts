import type { LayoutServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals }) => {
    const { getSession } = locals;

    return { session: await getSession() };
}