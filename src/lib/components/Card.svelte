<script lang="ts">
    import '../../app.postcss';
    import penImg from "../devAssets/pen.jpeg"
</script>

<div class="card-container">
    <h1 class="card-title">Title</h1>
    <img class="sign-img" src={penImg} alt={''}>
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
    
    .sign-img {
        width: 100%;
    }
    
    .card-description {
        width: 100%;
        text-align: center;
        color: aliceblue;
    }
}
</style>