<script lang="ts">
  import { Button } from "$lib/components/ui/button"
</script>

<main>
  <form method="POST">

<!--    <button formaction="?/login&provider=google">Google</button>-->
<!--    <button>Facebook</button>-->
    <Button variant="secondary" formaction="?/login&provider=google">Google</Button>
    <Button>Facebook</Button>
  </form>
</main>