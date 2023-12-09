<script lang="ts">
    import type { ISignUpload } from '$lib/interfaces/signUpload.js';
  export let data
  let newSign: ISignUpload = {
    name: '',
    image: null,
    video: null,
    audio: null,
    audioLang: 'eng',
  }
  const keysOfFiles = ['image', 'video', 'audio'];

  function getBucket(extension: string): string {
    switch(extension) {
        case 'jpeg':
        case 'jpg':
        case 'png':
            return'sign_images'
        case 'mp4':
            return'sign_videos'
        case 'mp3':
            return'sign_audio'
        default: 
            return 'videogames'
    }
  }
  
  async function handleFileUpload() {
    const { name, image, video, audio, audioLang } = newSign;
    if(!name || !image || !video || !audio) throw new Error('You must select required to upload.');

    for(const [key, val] of Object.entries(newSign)) {
        if(keysOfFiles.includes(key)) {
            const file = val[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const bucket = getBucket(fileExt);

            try {
                const { error  } = await data.supabase.storage.from(bucket).upload(`/${fileName}`, file);
                if(error) console.log('supabase-error: ', error);
            } catch (error) {
                console.log('error: ', error);
            }
        }
    }
  }
  </script>
  
  <div>
    <h3>Create New Sign</h3>
    <form method="POST">
        <div class="input-field">
            <label for="sign-name">Name: </label>
            <input type="text" required bind:value={newSign.name}>
        </div>

        <div class="input-field">
            <label for="sign-img">Image: </label>
            <input type="file" required bind:files={newSign.image}>
        </div>

        <div class="input-field">
            <label for="sign-video">Video: </label>
            <input type="file" required bind:files={newSign.video}>
        </div>

        <div class="input-field">
            <label for="sign-audio">Audio: </label>
            <input type="file" required bind:files={newSign.audio}>
        </div>

        <button on:click|preventDefault={handleFileUpload}>Upload</button>
    </form>
  </div>