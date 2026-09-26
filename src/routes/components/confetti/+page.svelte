<script lang="ts">
  import Button from '$lib/Button/Button.svelte';
  import Confetti from '$lib/Confetti/Confetti.svelte';
  import type { ConfettiOrigin } from '$lib/Confetti/properties';

  const ORIGINS: ConfettiOrigin[] = ['top', 'center', 'bottom', 'sides'];

  let burst = $state(0);
  let origin: ConfettiOrigin = $state('top');
  let themedBurst = $state(0);
  let finished = $state(0);

  function celebrate(from: ConfettiOrigin): void {
    origin = from;
    burst += 1;
  }
</script>

<div class="page-header">
  <span class="category-badge">Feedback & Status</span>
  <h1>Confetti</h1>
</div>

<h3>Origins</h3>
<div class="demo-row" style="align-items: center;">
  {#each ORIGINS as from (from)}
    <Button onclick={() => celebrate(from)}>{from}</Button>
  {/each}
  <span>Bursts finished: {finished}</span>
</div>
<div class="stage">
  {#key burst}
    {#if burst > 0}
      <Confetti {origin} onconfettiend={() => (finished += 1)} />
    {/if}
  {/key}
</div>

<h3>Themed, 80 pieces</h3>
<div class="demo-row">
  <Button onclick={() => (themedBurst += 1)}>Celebrate</Button>
</div>
<div class="stage">
  {#key themedBurst}
    {#if themedBurst > 0}
      <Confetti pieces={80} origin="center" classes="confetti-ocean" />
    {/if}
  {/key}
</div>

<style>
  .stage {
    position: relative;
    height: 320px;
    margin: 12px 0 24px;
    border: 1px dashed #d4d4d8;
    border-radius: 8px;
  }

  :global(.confetti-ocean) {
    --confetti-color-1: #0ea5e9;
    --confetti-color-2: #22d3ee;
    --confetti-color-3: #6366f1;
    --confetti-color-4: #14b8a6;
    --confetti-color-5: #a5f3fc;
    --confetti-piece-border-radius: 50%;
    --confetti-piece-height: 8px;
  }
</style>
