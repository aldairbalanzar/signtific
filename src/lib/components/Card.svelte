<script lang="ts">
	import type { ICardSign } from "$lib/interfaces/cardSignInterface";

  export let sign: ICardSign;
  export let playingId: string;
  let video: HTMLVideoElement;

  function videoEnded() {
    playingId = '';
  }

  function videoPlay() {
    playingId = sign.id;
  }

	$: isPlaying = (sign.id === playingId);
	$: if(isPlaying) video.play();
  $: disabled = Boolean(playingId.length)
</script>

<button 
class="card-container"
on:click={videoPlay}
disabled={disabled}
>
  <h1 class="card-title">Title</h1>
  <img
  class={isPlaying ? 'hide' : 'card-img'}
  src={sign.img}
  alt={sign.title}
  >
  <video
  class={isPlaying ? 'card-video' : 'hide'}
  src={sign.video}
  bind:this={video}
  on:ended={videoEnded}
  >
    <track kind="captions" />
  </video>
</button>

<style>
  button.card-container[disabled] {
    width: 30%;
    border: 2px solid blue !important; 
    pointer-events: none;
  } 
  .card-container {
    /* border: 2px solid red; */
    width: 224px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

  }
  .card-title {
    width: 100%;
    text-align: center;
  }
  .card-img {
    width: 224px;
    object-fit: contain;
  }
  .card-video {
    width: 224px;
    object-fit: contain;
  }
  .hide {
    display: none;
  }
</style>