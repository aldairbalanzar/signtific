import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const { getSession } = locals;

    return { session: await getSession() };
}