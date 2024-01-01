<script lang="ts">
	import type { ICardSign } from "$lib/interfaces/cardSign";
	import type { SupabaseClient } from "@supabase/supabase-js";

  export let sign: ICardSign;
  export let playingId: string;
  export let supabase: SupabaseClient;
  let video: HTMLVideoElement;
  let audio: HTMLAudioElement;

  async function fetchVideoAndAudio() {
    const videoRes = await supabase.storage
    .from(sign.video_bucket).createSignedUrl(sign.video_file_name, 60);

    const audioRes = await supabase.storage
    .from(sign.audio_bucket).createSignedUrl(sign.audio_file_name, 60);

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

	$: isPlaying = (sign.id === playingId);
	$: if(isPlaying){
    video.play();
    audio.play();
  }
  $: disabled = Boolean(playingId.length && !isPlaying);
  $: currentVideoSrc = '';
  $: currentAudioSrc = '';
</script>

<button 
class="card-container"
on:click={signPlay}
data-sveltekit-preload-data
disabled={disabled}
>
  <h1 class="card-title">{sign.name}</h1>
  <input
  type="image"
  class={isPlaying ? 'hide' : 'card-img'}
  src={sign.image_url}
  alt={sign.name}
  >
  <video
  muted
  class={isPlaying ? 'card-video' : 'hide'}
  src={currentVideoSrc}
  bind:this={video}
  on:ended={signEnded}
  >
    <track kind="captions" />
  </video>
  <audio 
  src={currentAudioSrc}
  bind:this={audio}
  >
  </audio>
</button>

<style>
  button.card-container[disabled] {
    pointer-events: none;
  } 
  .card-container {
    border-radius: 10%;
    width: 155px;
    height: 155px;
    background-color: #ffffff00;
    margin-top: 2%;

  }

  .card-title {
    font-size: .8rem;
    color: rgb(0, 0, 0);
    text-align: center;
    font-weight: bold;
    width: 100%;
    margin: 0;
  }
  .card-img {
    width: 100%;
    height: 135px;
    object-fit: cover;
    border-radius: 10%;
  }
  .card-video {
    width: 100%;
    height: 135px;
    object-fit: cover;
    border-radius: 10%;

  }
  .hide {
    display: none;
  }
</style>