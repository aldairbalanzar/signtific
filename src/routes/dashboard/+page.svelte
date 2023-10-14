<script lang="ts">
import Card from "$lib/components/Card.svelte";
import type { ICardSign } from "$lib/interfaces/cardSignInterface";
import turtleImg from "$lib/images/turtleImg.jpg";
import duckImg from "$lib/images/duckImg.jpg";
import turtleVideo from "$lib/video/turtle.mp4";
import duckVideo from "$lib/video/duck.mp4";

let signs: ICardSign[] = [
  {
    id: '1',
    title: 'turtle',
    img: turtleImg,
    video: turtleVideo,
    play: false,
  },
  {
    id: '2',
    title: 'duck',
    img: duckImg,
    video: duckVideo,
    play: false,
  },
  {
    id: '3',
    title: 'turtle',
    img: turtleImg,
    video: turtleVideo,
    play: false,
  },
  {
    id: '4',
    title: 'duck',
    img: duckImg,
    video: duckVideo,
    play: false,
  },
  {
    id: '5',
    title: 'turtle',
    img: turtleImg,
    video: turtleVideo,
    play: false,
  },
  {
    id: '6',
    title: 'duck',
    img: duckImg,
    video: duckVideo,
    play: false,
  },
  {
    id: '7',
    title: 'turtle',
    img: turtleImg,
    video: turtleVideo,
    play: false,
  },
  {
    id: '8',
    title: 'duck',
    img: duckImg,
    video: duckVideo,
    play: false,
  },
  {
    id: '9',
    title: 'turtle',
    img: turtleImg,
    video: turtleVideo,
    play: false,
  },
  {
    id: '10',
    title: 'duck',
    img: duckImg,
    video: duckVideo,
    play: false,
  },
];
$: playingId = '';
</script>

<main class="container">
{#each signs as sign}
  <Card
  {sign}
  bind:playingId={playingId}
  />
{/each}
</main>

<style>
  .container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
</style>