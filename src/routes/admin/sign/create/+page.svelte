<script lang="ts">
import type { ISignUploadPayload, ISignUpload } from '$lib/interfaces/signUpload.js';
export let data;
const { supabase } = data;

    let newSignPayload: ISignUploadPayload = {
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
            case 'MP4':
                return'sign_videos'
            case 'mp3':
                return'sign_audio'
            default: 
                return ''
        }
    }

    async function handleFileUpload() {
        let newSign: ISignUpload = {
            name: '',
            image_url: '',
            video_bucket: '',
            audio_bucket: '',
            video_file_name: '',
            audio_file_name: '',
        }

        const { name, image, video, audio, audioLang } = newSignPayload;
        if(!name || !image || !video || !audio) throw new Error('You must fill in required fields.');
        newSign.name = name;

        for(const [key, val] of Object.entries(newSignPayload)) {
            if(keysOfFiles.includes(key)) {
                const file = val[0];
                const fileExt: string = file.name.split('.').pop();
                const fileName: string = `${Math.random()}.${fileExt.toLowerCase()}`;
                const bucket = getBucket(fileExt);

                try {
                    const { error  } = await data.supabase.storage.from(bucket).upload(`/${fileName}`, file);
                    if(error) console.log('supabase-error: ', error);
                } catch (error) {
                    console.log('error: ', error);
                }

                switch(bucket) {
                    case 'sign_images':
                        newSign.image_url = `https://txyxoufkveznvharvjvu.supabase.co/storage/v1/object/public/sign_images/${fileName}`;
                    case 'sign_videos':
                        newSign.video_bucket = bucket;
                        newSign.video_file_name = fileName;
                    case 'sign_audio':
                        newSign.audio_bucket = bucket;
                        newSign.audio_file_name = fileName;
                }
            }
        }

        try {
            const { data, error } = await supabase.from('american_signs').insert(newSign).select('*')
            if(error) console.log('supabase-error: ', error);
            console.log('data: ', data);
        } catch (error) {
            console.log('error: ', error);
        }

    }
  </script>
  
  <div>
    <h3>Create New Sign</h3>
    <form method="POST">
        <div class="input-field">
            <label for="sign-name">Name: </label>
            <input type="text" required bind:value={newSignPayload.name}>
        </div>

        <div class="input-field">
            <label for="sign-img">Image: </label>
            <input type="file" required bind:files={newSignPayload.image}>
        </div>

        <div class="input-field">
            <label for="sign-video">Video: </label>
            <input type="file" required bind:files={newSignPayload.video}>
        </div>

        <div class="input-field">
            <label for="sign-audio">Audio: </label>
            <input type="file" required bind:files={newSignPayload.audio}>
        </div>

        <button on:click|preventDefault={handleFileUpload}>Upload</button>
    </form>
  </div>