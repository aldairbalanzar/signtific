<script lang="ts">
    import '../../app.postcss';
    import penImg from "../devAssets/pen.jpeg";
    import penVid from "../devAssets/pen.mp4";

    let isVideoPaused: boolean = true;

    function togglePlayVideo(): void {
        isVideoPaused = false;
    }
</script>

<div class="card-container">
    <h1 class="card-title">Title</h1>
    <button on:click={togglePlayVideo}
    class="img-btn" 
    style="display: {isVideoPaused ? 'block' : 'none'}">
        <img class="sign-img"
        src={penImg}
        alt={'pen image'}>
    </button>

    <div class="video-container">
        <video bind:paused={isVideoPaused}
        src={penVid}
        class="sign-vid"
        style="display: {isVideoPaused ? 'none' : 'block'}">
        <track kind="captions">
    </div>

    <div class="card-description">card description</div>
</div>

<style lang="postcss">
.card-container {
    width: 18%;
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
        width: 100%;
        border: none;
        background-color: transparent;
        display: flex;
        justify-content: center;
        padding: 0;



        .sign-img {
            width: 80%;
            object-fit: cover;
            height: 240px;
        }
    }

    .video-container {
        width: 100%;
        display: flex;
        justify-content: center;

        .sign-vid {
            width: 80%;
            height: 240px;
            object-fit: cover;
            display: none;
        }
    }
    
    .card-description {
        width: 100%;
        text-align: center;
        color: aliceblue;
    }
}
</style>