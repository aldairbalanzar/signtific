<script lang="ts">
	import type { CardSign } from "$lib/interfaces/cardInterface";

  export let sign: CardSign;
  let isPlaying = false;
  let video: HTMLVideoElement;

  function handleVideoPlay() {
    isPlaying = true;
    video.play();
  }

  function handleVideoEnd() {
    isPlaying = false;
  }
</script>

<button class="card-container" on:click={handleVideoPlay}>
  <h1 class="card-title">Title</h1>
  <img
  class={isPlaying ? 'hide' : 'card-img'}
  src={sign.img}
  alt="turtle">
  <video
  class={isPlaying ? 'card-video' : 'hide'}
  src={sign.video}
  bind:this={video}
  on:ended={handleVideoEnd}
  >
    <track kind="captions" />
  </video>
</button>

<style>
  .card-container {
    border: 2px solid red;
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