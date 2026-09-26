<script lang="ts">
  import type { EmptyStateProperties } from './properties';

  let {
    title,
    description,
    announce = false,
    icon,
    actions,
    testId,
    classes
  }: EmptyStateProperties = $props();
</script>

<div class="empty-state {classes ?? ''}" role={announce ? 'status' : null} data-pw={testId}>
  {#if typeof icon === 'function'}
    <div class="empty-state-icon">
      {@render icon()}
    </div>
  {/if}
  <p class="empty-state-title">{title}</p>
  {#if typeof description === 'string' && description.length > 0}
    <p class="empty-state-description">{description}</p>
  {/if}
  {#if typeof actions === 'function'}
    <div class="empty-state-actions">
      {@render actions()}
    </div>
  {/if}
</div>

<style>
  .empty-state {
    flex: var(--empty-state-flex, 1);
    display: flex;
    flex-direction: column;
    align-items: var(--empty-state-align-items, center);
    justify-content: var(--empty-state-justify-content, center);
    gap: var(--empty-state-gap, 16px);
    padding: var(--empty-state-padding, 32px 16px);
    text-align: var(--empty-state-text-align, center);
    color: var(--empty-state-color, currentColor);
    font-family: var(--empty-state-font-family, inherit);
  }

  .empty-state-icon {
    display: flex;
    color: var(--empty-state-icon-color, currentColor);
    font-size: var(--empty-state-icon-size, 48px);
  }

  .empty-state-icon :global(svg) {
    width: var(--empty-state-icon-size, 48px);
    height: var(--empty-state-icon-size, 48px);
  }

  .empty-state-title {
    margin: 0;
    font-size: var(--empty-state-title-font-size, 18px);
    font-weight: var(--empty-state-title-font-weight, 600);
    line-height: var(--empty-state-title-line-height, 1.4);
    color: var(--empty-state-title-color, currentColor);
  }

  .empty-state-description {
    margin: 0;
    font-size: var(--empty-state-description-font-size, 14px);
    line-height: var(--empty-state-description-line-height, 1.5);
    color: var(--empty-state-description-color, currentColor);
  }

  .empty-state-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: var(--empty-state-actions-justify-content, center);
    gap: var(--empty-state-actions-gap, 8px);
  }
</style>
