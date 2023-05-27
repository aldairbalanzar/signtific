<script lang="ts">
    import '../../app.postcss';
    import penImg from "../devAssets/pen.jpeg";
    import penVid from "../devAssets/pen.mp4";

    function handlePlayVideo(value: string): void {
        console.log(value);
    }

    const id = 'dat string'
</script>

<div class="card-container">
    <h1 class="card-title">Title</h1>
    <button class="img-btn" on:click={() => {handlePlayVideo(id)}}>
        <img class="sign-img" src={penImg} alt={''}>
    </button>
    <div class="video-container">
        <video class="sign-vid" src={penVid}>
        <track kind="captions">
    </div>
    <div class="card-description">card description</div>
</div>

<style lang="postcss">
.card-container {
    width: 20%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border: 2px solid purple;
    border-radius: 3px;

    .card-title {
        width: 100%;
        text-align: center;
        color: aliceblue;
    }
    
    .img-btn {
        .sign-img {
            width: 100%;
        }
    }

    .video-container {
        width: 100%;
        display: flex;

        .sign-vid {
            width: 100%;
            object-fit: contain;
        }
    }
    
    .card-description {
        width: 100%;
        text-align: center;
        color: aliceblue;
    }
}
</style>