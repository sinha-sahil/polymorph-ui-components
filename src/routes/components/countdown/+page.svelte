<script lang="ts">
  import Button from '$lib/Button/Button.svelte';
  import Countdown from '$lib/Countdown/Countdown.svelte';

  let run = $state(0);
  let finished = $state(0);
</script>

<div class="page-header">
  <span class="category-badge">Feedback & Status</span>
  <h1>Countdown</h1>
</div>

<h3>Five seconds</h3>
<div class="demo-row" style="align-items: center;">
  <Button onclick={() => (run += 1)}>Restart</Button>
  <span>Finished: {finished}</span>
</div>
<div class="demo-row">
  {#key run}
    <Countdown duration={5000} ariaLabel="Five seconds" oncountdownend={() => (finished += 1)} />
  {/key}
</div>

<h3>Themed</h3>
<div class="demo-row">
  {#key run}
    <Countdown duration={5000} classes="countdown-pill" />
  {/key}
</div>

<style>
  :global(.countdown-pill) {
    --countdown-height: 8px;
    --countdown-border-radius: 999px;
    --countdown-track-color: #dcfce7;
    --countdown-color: #16a34a;
  }
</style>
