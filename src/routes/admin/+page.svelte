<script lang="ts">
export let data;
let files: FileList;

async function handleFileUpload() {
    if(!files || !files.length) throw new Error('You must select an image to upload.');

    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    try {
        console.log('name: ', fileName);
        const { error  } = await data.supabase.storage.from('sign_images').upload(`/videogames/${fileName}`, file);
        if(error) console.log('supabase-error: ', error);
    } catch (error) {
        console.log('error: ', error);
    }
}
</script>

<ul class="admin-links-container">
    <li class="admin-link"><a href="/admin/sign/create">Create Sign</a></li>
    <li class="admin-link"><a href="/admin/sign/manage">Manage Signs</a></li>
</ul>

<!-- <div>
    <form method="POST">
        <label for="file-upload"></label>
        <input
        required
        accept=".jpeg, .jpg, .png"
        bind:files
        name="file-upload" 
        type="file"
        >

        <button on:click|preventDefault={handleFileUpload}>Upload</button>
    </form>
</div> -->