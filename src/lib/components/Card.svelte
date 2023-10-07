<script lang="ts">
  import turtleVideo from '$lib/video/turtle.mp4';
  import turtleImg from '$lib/images/turtleImg.jpg';
</script>

<div class="card-container">
  <h1 class="card-title">Title</h1>
  <img src={turtleImg} alt="turtle" class="card-img">
  <video class="card-video" src={turtleVideo} >
    <track kind="captions" />
  </video>
</div>

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
</style>