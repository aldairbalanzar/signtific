<script lang="ts">
	import type { ICardSign } from '$lib/interfaces/cardSign';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let sign: ICardSign;
	export let playingId: string;
	export let supabase: SupabaseClient;
	let video: HTMLVideoElement;
	let audio: HTMLAudioElement;

	async function fetchVideoAndAudio() {
		const videoRes = await supabase.storage
			.from(sign.video_bucket)
			.createSignedUrl(sign.video_file_name, 60);

		const audioRes = await supabase.storage
			.from(sign.audio_bucket)
			.createSignedUrl(sign.audio_file_name, 60);

		currentVideoSrc = videoRes.data?.signedUrl ?? '';
		currentAudioSrc = audioRes.data?.signedUrl ?? '';
	}

	function signEnded() {
		playingId = '';
	}

	async function signPlay() {
		await fetchVideoAndAudio();
		playingId = sign.id;
	}

	const cardMedia: string = 'w-48 h-48 object-cover p-2 rounded-b-2xl';

	$: isPlaying = sign.id === playingId;
	$: if (isPlaying) {
		video.play();
		audio.play();
	}
	$: disabled = Boolean(playingId.length);
	$: currentVideoSrc = '';
	$: currentAudioSrc = '';
</script>

<button
	class="card variant-outline-secondary rounded-2xl"
	on:click={signPlay}
	data-sveltekit-preload-data
	{disabled}
>
	<h1 class="card-header font-sans text-lg">{sign.name}</h1>

	<img class={isPlaying ? 'hidden' : cardMedia} src={sign.image_url} alt={sign.name} />

	<video
		muted
		class={isPlaying ? cardMedia : 'hidden'}
		src={currentVideoSrc}
		bind:this={video}
		on:ended={signEnded}
	>
		<track kind="captions" />
	</video>

	<audio src={currentAudioSrc} bind:this={audio}> </audio>
</button>
