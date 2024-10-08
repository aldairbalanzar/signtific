<script lang="ts">
	import type { ISignUploadPayload, ISignUpload } from '$lib/interfaces/signUpload.js';
	export let data;
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { BarLoader } from 'svelte-loading-spinners';

	const toastStore = getToastStore();
	const { supabase } = data;

	$: isCreating = false;
	let newSignPayload: ISignUploadPayload = {
		name: '',
		image: null,
		video: null,
		audio: null,
		audioLang: 'eng'
	};
	const keysOfFiles = ['image', 'video', 'audio'];

	function getBucket(extension: string): string {
		switch (extension) {
			case 'jpeg':
			case 'jpg':
			case 'png':
				return 'sign_images';
			case 'mp4':
			case 'MP4':
				return 'sign_videos';
			case 'mp3':
				return 'sign_audio';
			default:
				return '';
		}
	}

	async function handleFileUpload() {
		isCreating = true;
		let newSign: ISignUpload = {
			name: '',
			image_url: '',
			video_bucket: '',
			audio_bucket: '',
			video_file_name: '',
			audio_file_name: ''
		};

		const { name, image, video, audio, audioLang } = newSignPayload;
		if (!name || !image || !video || !audio) throw new Error('You must fill in required fields.');
		newSign.name = name;

		for (const [key, val] of Object.entries(newSignPayload)) {
			if (keysOfFiles.includes(key)) {
				const file: File = val[0];
				const fileExt: string = file.name.split('.').pop() ?? '';
				const fileName: string = `${Math.random()}.${fileExt.toLowerCase()}`;
				const bucket = getBucket(fileExt);

				try {
					const { error } = await data.supabase.storage.from(bucket).upload(`/${fileName}`, file);
					if (error) console.log('supabase-error: ', error);
				} catch (error) {
					console.log('error: ', error);
				}

				switch (bucket) {
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

			let toast: ToastSettings;
			if (data) {
				console.log('data: ', data);
				toast = {
					message: 'successfully created new sign!',
					timeout: 5000,
					background: 'variant-filled-success',
					classes: 'font-sans'
				};

				isCreating = false;
				clearInputs();
			} else {
				toast = {
					message: 'something went wrong when creating the new sign...',
					timeout: 5000,
					background: 'variant-filled-primary',
					classes: 'font-sans'
				};

				isCreating = false;
				console.log('supabase-error: ', error);
			}

			toastStore.trigger(toast);
		} catch (error) {
			console.log('error: ', error);
		}
	}

	function clearInputs(): void {
		newSignPayload = {
			name: '',
			image: null,
			video: null,
			audio: null,
			audioLang: 'eng'
		};

		keysOfFiles.forEach((key) => {
			const input = document.querySelector(`.form-control[name='${key}']`) as HTMLInputElement;
			input.value = '';
		});
	}
</script>

<div class="flex w-full flex-wrap justify-around pt-10">
	<h3 class="w-full pb-2 text-center font-sans text-2xl">Create New Sign</h3>
	<form
		on:submit|preventDefault={handleFileUpload}
		method="POST"
		class="flex w-1/3 flex-wrap justify-center"
	>
		<div class="input-field flex w-full pt-3 font-sans">
			<label for="sign-name" class="w-1/3">Name: </label>
			<input
				type="text"
				required
				name="name"
				bind:value={newSignPayload.name}
				class="form-control w-2/3 rounded-sm p-1 font-sans text-black outline-none"
			/>
		</div>

		<div class="input-field flex w-full pt-3">
			<label for="sign-img" class="w-1/3 font-sans">Image: </label>
			<input
				type="file"
				required
				name="image"
				bind:files={newSignPayload.image}
				class="form-control w-2/3 font-sans hover:cursor-pointer"
			/>
		</div>

		<div class="input-field flex w-full pt-3">
			<label for="sign-video" class="w-1/3 font-sans">Video: </label>
			<input
				type="file"
				required
				name="video"
				bind:files={newSignPayload.video}
				class="form-control w-2/3 font-sans hover:cursor-pointer"
			/>
		</div>

		<div class="input-field flex w-full pt-3">
			<label for="sign-audio" class="w-1/3 font-sans">Audio: </label>
			<input
				type="file"
				required
				name="audio"
				bind:files={newSignPayload.audio}
				class="form-control w-2/3 font-sans hover:cursor-pointer"
			/>
		</div>

		<button type="submit" class="variant-ghost btn mt-6 font-sans"> Upload </button>
		{#if isCreating}
			<div class="flex w-full flex-wrap justify-around pt-10">
				<BarLoader color="rgb(70 133 175)" />
				<p class="w-full pb-2 pt-2 text-center font-sans">creating new sign...</p>
			</div>
		{/if}
	</form>
</div>
