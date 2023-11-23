<script lang="ts">
import {page} from '$app/stores'
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
export let data;

$: if(browser && data.session) goto(`${$page.url.origin}/protected/dashboard`);
</script>