import type { Actions } from "./$types";

export const actions: Actions = {
    upload: async ({ request, locals }) => {
        const formData = await request.formData();
        const newFile = formData.get('file-upload');
        const extension = newFile?.valueOf().toString().split('.').pop();
        const fileName = `/videogames/${Math.random()}.${extension}`;
        const supabase = locals.supabase;

        if(newFile) {
            try {
                const { error } = await supabase.storage.from('sign_images').upload(fileName, newFile);
                if(error) throw error;
    
            } catch (error) {
                if(error) console.log('sveltekit-server-error: ', error);
            }
        }
    }
};