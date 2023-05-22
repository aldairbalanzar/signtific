<script lang="ts">
</script>

<main class="container">
    <h1 class="page-title">Register</h1>
    <form class="form" action="?/register" method="POST">
        <div class="form-inputs-container">
            <div class="input-container">
                <label class="form-label" for="email">Email</label>
                <input class="form-input" type="text" name="email">
            </div>
            <div class="input-container">
                <label class="form-label" for="password">Password</label>
                <input class="form-input" type="password" name="password">
            </div>
        </div>

        <div class="btn-container">
            <button class="btn">Register</button>
        </div>
    </form>
</main>

<style lang="postcss">
    .container {
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

    .page-title {
        width: 100%;
        font-size: 2.4rem;
        text-align: center;
        color: aliceblue;
        padding: 3% 0;
    }
    .form {
        width: 33%;
        display: flex;
        flex-wrap: wrap;
        height: 500px;
        border: 2px solid red;
        border-radius: 5px;
        justify-content: space-around;

        .form-inputs-container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;

            .input-container {
                width: 100%;
                justify-content: space-around;
                align-content: center;
                display: flex;
                flex-wrap: wrap;

            .form-label {
                    width: 33%;
                    font-size: 1.6rem;
                    color: white;
                }

                .form-input {
                    width: 50%;
                    height: 20%;
                    color: hsl(220 20% 14%);
                    border: none;
                    border-radius: 3px;
                }
                .form-input:focus {
                    outline: none;
                }
            }
        }
        
        .btn-container {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .btn {
                width: 24%;
                background-color: rgb(246, 126, 255);
                border: none;
                border-radius: 3px;
                padding: 2% 1%;
                color: hsl(220 20% 14%);
                font-size: 1.6rem;
                text-align: center;
                text-decoration: none;
                transition: .35s;
            }
            .btn:hover {
                background-color: aliceblue;
                color: hsl(220 20% 14%);
                cursor: pointer;
            }
        }
    }
}
</style>