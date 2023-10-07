<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import type { CardSign } from "$lib/interfaces/cardInterface";
  import turtleImg from "$lib/images/turtleImg.jpg";
  import turtleVideo from "$lib/video/turtle.mp4";
  import duckVideo from "$lib/video/duck.mp4";

  let signs: CardSign[] = [
    {
      id: '1',
      title: 'turtle',
      img: turtleImg,
      video: turtleVideo,
    },
    {
      id: '2',
      title: 'duck',
      img: turtleImg,
      video: duckVideo,
    },
  ]

</script>

<h1>Signtific</h1>
{#each signs as sign}
  <Card sign={sign}/>
{/each}
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
