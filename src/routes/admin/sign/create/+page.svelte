<script lang="ts">
  export let data
  interface ISignUpload {
      name: string;
      image: FileList | null;
      video: FileList | null;
      audio: FileList | null;
      audioLang: string;
  }

  let newSign: ISignUpload = {
    name: '',
    image: null,
    video: null,
    audio: null,
    audioLang: 'eng',
  }

  const keysOfFiles = ['image', 'video', 'audio'];


  
  async function handleFileUpload() {
    const { name, image, video, audio, audioLang } = newSign;
    if(!name || !image || !video || !audio) throw new Error('You must select an image to upload.');

    for(const [key, val] of Object.entries(newSign)) {
        if(keysOfFiles.includes(key)) {
            const file = val[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
        }
    }
    //   try {
    //       console.log('name: ', fileName);
    //       const { error  } = await data.supabase.storage.from('sign_images').upload(`/videogames/${fileName}`, file);
    //       if(error) console.log('supabase-error: ', error);
    //   } catch (error) {
    //       console.log('error: ', error);
    //   }
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