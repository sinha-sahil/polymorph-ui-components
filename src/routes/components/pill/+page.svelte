<script lang="ts">
  import Pill from '$lib/Pill/Pill.svelte';
  import Button from '$lib/Button/Button.svelte';

  const ITEMS = ['Svelte', 'React', 'Vue', 'Angular'];

  let pillItems = $state([...ITEMS]);
  let archived = $state(true);
  const pills: Record<string, ReturnType<typeof Pill> | null> = $state({});

  function dismiss(index: number): void {
    pillItems = pillItems.filter((_, position) => position !== index);
    const next = pillItems.at(Math.min(index, pillItems.length - 1)) ?? null;
    if (next !== null) {
      pills[next]?.focus();
    }
  }
</script>

<div class="page-header">
  <span class="category-badge">Buttons & Actions</span>
  <h1>Pill</h1>
</div>

<div class="demo-row">
  {#each pillItems as item, index (item)}
    <Pill
      bind:this={pills[item]}
      text={item}
      dismissible
      dismissLabel="Remove {item}"
      ondismiss={() => dismiss(index)}
    />
  {/each}
  {#if pillItems.length === 0}
    <Button text="Reset Pills" onclick={() => (pillItems = [...ITEMS])} />
  {/if}
</div>

<h3>Disabled</h3>
<div class="demo-row">
  {#if archived}
    <Pill
      text="Archived"
      dismissible
      dismissLabel="Remove Archived"
      disabled
      ondismiss={() => (archived = false)}
    />
  {/if}
</div>
