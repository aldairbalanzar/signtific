export const load = async ({ locals }) => {
    const { supabase } = locals;

    async function fetchSigns() {
        const { data } = await supabase.from('american_signs').select('*').limit(10);

       return data;
    }

    return {
        signs: fetchSigns(),
    }
};