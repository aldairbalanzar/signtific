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
                const file: File = val[0];
                const fileExt: string = file.name.split('.').pop() ?? '';
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
            const { data, error } = await supabase.from('american_signs').insert(newSign).select('*');
            if(error) console.log('supabase-error: ', error);

            console.log('data: ', data);
        } catch (error) {
            console.log('error: ', error);
        }
    }
  </script>
  
  <div class="w-full flex flex-wrap justify-around pt-10">
    <h3 class="w-full text-center">Create New Sign</h3>
    <form method="POST" class="w-1/3 flex justify-center flex-wrap">
        <div class="input-field flex w-full pt-3">
            <label for="sign-name" class="w-1/3">Name: </label>
            <input type="text" required bind:value={newSignPayload.name} class="w-2/3">
        </div>

        <div class="input-field flex w-full pt-3">
            <label for="sign-img" class="w-1/3 ">Image: </label>
            <input type="file" required bind:files={newSignPayload.image} class="w-2/3">
        </div>

        <div class="input-field flex w-full pt-3">
            <label for="sign-video" class="w-1/3">Video: </label>
            <input type="file" required bind:files={newSignPayload.video} class="w-2/3">
        </div>

        <div class="input-field flex w-full pt-3">
            <label for="sign-audio" class="w-1/3">Audio: </label>
            <input type="file" required bind:files={newSignPayload.audio} class="w-2/3">
        </div>

        <button on:click|preventDefault={handleFileUpload} class="btn font-sans variant-ghost mt-6">Upload</button>
    </form>
  </div>