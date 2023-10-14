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
  $: disabled = Boolean(playingId.length && !isPlaying)
</script>

<button 
class="card-container"
on:click={videoPlay}
disabled={disabled}
>
  <h1 class="card-title">{sign.title}</h1>
  <input
  type="image"
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