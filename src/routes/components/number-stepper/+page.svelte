<script lang="ts">
  import NumberStepper from '$lib/NumberStepper/NumberStepper.svelte';
  import deleteSvg from '$lib/assets/delete.svg?raw';
  import minusSvg from '$lib/assets/minus.svg?raw';

  let quantity = $state(2);
  let lineQuantity = $state(1);

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function updateLine(next: number): Promise<void> {
    await wait(800);
    lineQuantity = next;
  }
</script>

<div class="page-header">
  <span class="category-badge">Form Controls</span>
  <h1>NumberStepper</h1>
</div>

<h3>Basic (0–5)</h3>
<div class="demo-row" style="align-items: center;">
  <NumberStepper value={quantity} min={0} max={5} onchange={(next) => (quantity = next)} />
  <span>Value: {quantity}</span>
</div>

<h3>Async cart line (remove at 1)</h3>
<div class="demo-row" style="align-items: center;">
  <NumberStepper
    value={lineQuantity}
    ariaLabel="Quantity"
    decrementLabel={lineQuantity === 1 ? 'Remove item' : 'Decrease quantity'}
    incrementLabel="Increase quantity"
    loadingLabel="Updating quantity"
    onchange={updateLine}
  >
    {#snippet decrementIcon(value)}
      <!-- eslint-disable svelte/no-at-html-tags -->
      {#if value === 1}
        {@html deleteSvg}
      {:else}
        {@html minusSvg}
      {/if}
    {/snippet}
  </NumberStepper>
  <span>{lineQuantity === 0 ? 'Removed' : `In cart: ${lineQuantity}`}</span>
</div>

<h3>Disabled</h3>
<div class="demo-row" style="align-items: center;">
  <NumberStepper value={3} disabled />
</div>
