<script lang="ts">
  import Button from '$lib/Button/Button.svelte';
  import EmptyState from '$lib/EmptyState/EmptyState.svelte';
  import Loader from '$lib/Loader/Loader.svelte';
  import searchSvg from '$lib/assets/search.svg?raw';
</script>

<div class="page-header">
  <span class="category-badge">Layout & Containers</span>
  <h1>EmptyState</h1>
</div>

<h3>With icon, description and action</h3>
<div class="demo-row" style="max-width: 420px;">
  <EmptyState
    title="No results"
    description="Nothing matches your search. Try a different word."
    announce
  >
    {#snippet icon()}
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html searchSvg}
    {/snippet}
    {#snippet actions()}
      <Button text="Clear search" />
    {/snippet}
  </EmptyState>
</div>

<h3>Loading</h3>
<div class="demo-row" style="max-width: 420px;">
  <EmptyState title="Loading your orders…" announce>
    {#snippet icon()}
      <Loader />
    {/snippet}
  </EmptyState>
</div>

<h3>Title only</h3>
<div class="demo-row" style="max-width: 420px;">
  <EmptyState title="Nothing here yet" />
</div>
