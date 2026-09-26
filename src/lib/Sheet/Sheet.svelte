<script lang="ts">
  import type { SheetProperties } from './properties';
  import { fly, fade } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';
  import { tick } from 'svelte';
  import Button from '../Button/Button.svelte';
  import closeSvg from '$lib/assets/close.svg?raw';
  import { deepActiveElement, focusableElements, lockDocumentScroll } from '$lib/utils';

  let {
    open = $bindable(false),
    side = 'right',
    title,
    showOverlay = true,
    showCloseButton = true,
    closeLabel = 'Close',
    testId,
    content,
    footer,
    closeIcon,
    onclose,
    classes
  }: SheetProperties = $props();

  let overlayDiv: HTMLDivElement | null = $state(null);
  let sheetPanel: HTMLDivElement | null = $state(null);
  let openerElement: HTMLElement | null = null;

  let fadeDuration = $derived(prefersReducedMotion.current ? 0 : 200);

  let flyParams = $derived.by(() => {
    const duration = prefersReducedMotion.current ? 0 : 300;
    switch (side) {
      case 'left':
        return { x: '-100%', duration };
      case 'right':
        return { x: '100%', duration };
      case 'top':
        return { y: '-100%', duration };
      case 'bottom':
        return { y: '100%', duration };
    }
  });

  function enter() {
    if (openerElement === null) {
      const active = deepActiveElement();
      openerElement = active instanceof HTMLElement ? active : null;
    }
    tick().then(() => {
      if (sheetPanel !== null) {
        sheetPanel.focus();
      }
    });
  }

  function restoreFocus() {
    if (openerElement !== null && openerElement.isConnected) {
      openerElement.focus();
    }
    openerElement = null;
  }

  function close() {
    open = false;
    restoreFocus();
    onclose?.();
  }

  function handleOverlayClick(event: MouseEvent) {
    if (event.target === overlayDiv) {
      close();
    }
  }

  function trapTab(event: KeyboardEvent) {
    if (sheetPanel === null) {
      return;
    }
    const focusable = focusableElements(sheetPanel);
    const first = focusable.at(0);
    const last = focusable.at(-1);

    if (!(first instanceof HTMLElement) || !(last instanceof HTMLElement)) {
      event.preventDefault();
      sheetPanel.focus();
      return;
    }

    const active = deepActiveElement();
    const inside = active === sheetPanel || focusable.some((element) => element === active);
    if (!inside) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && (active === first || active === sheetPanel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      trapTab(event);
    }
  }

  function handleWindowKeyDown(event: KeyboardEvent) {
    if (!open || event.defaultPrevented) {
      return;
    }
    if (overlayDiv !== null && event.composedPath().includes(overlayDiv)) {
      return;
    }
    handleKeyDown(event);
  }

  function sheetAction(_node: HTMLElement) {
    const unlockScroll = lockDocumentScroll();
    enter();
    return {
      destroy() {
        unlockScroll();
        restoreFocus();
      }
    };
  }
</script>

<svelte:window onkeydown={handleWindowKeyDown} />

{#if open}
  <div
    bind:this={overlayDiv}
    use:sheetAction
    class="sheet-overlay {showOverlay ? 'overlay-active' : 'overlay-inactive'} {classes ?? ''}"
    onclick={handleOverlayClick}
    onkeydown={handleKeyDown}
    role="presentation"
    data-pw={testId}
    transition:fade={{ duration: fadeDuration }}
  >
    <div
      bind:this={sheetPanel}
      class="sheet-panel {side}"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Sheet'}
      tabindex="-1"
      transition:fly|global={flyParams}
      onintrostart={enter}
    >
      {#if typeof title === 'string' || showCloseButton}
        <div class="sheet-header">
          {#if typeof title === 'string'}
            <h2 class="sheet-title">{title}</h2>
          {/if}
          {#if showCloseButton}
            <div class="sheet-close-button">
              <Button
                onclick={close}
                ariaLabel={closeLabel}
                {...typeof testId === 'string' ? { testId: `${testId}-close` } : {}}
              >
                {#if typeof closeIcon === 'function'}
                  {@render closeIcon()}
                {:else}
                  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                  {@html closeSvg}
                {/if}
              </Button>
            </div>
          {/if}
        </div>
      {/if}
      <div class="sheet-content">
        {@render content()}
      </div>
      {#if typeof footer === 'function'}
        <div class="sheet-footer">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .sheet-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: var(--sheet-overlay-z-index, 15);
    -webkit-tap-highlight-color: transparent;
  }

  .overlay-active {
    background-color: var(--sheet-overlay-background, #00000066);
    pointer-events: auto;
  }

  .overlay-inactive {
    pointer-events: none;
  }

  .sheet-panel {
    position: fixed;
    display: flex;
    flex-direction: column;
    background-color: var(--sheet-background, #ffffff);
    box-shadow: var(--sheet-box-shadow, -2px 0 8px rgba(0, 0, 0, 0.15));
    z-index: var(--sheet-z-index, 16);
    pointer-events: auto;
    outline: none;
  }

  .sheet-panel.left,
  .sheet-panel.right {
    top: 0;
    bottom: 0;
    width: var(--sheet-width, 400px);
    max-width: var(--sheet-max-width, 100vw);
  }

  .sheet-panel.left {
    left: 0;
    border-right: var(--sheet-border, none);
  }

  .sheet-panel.right {
    right: 0;
    border-left: var(--sheet-border, none);
  }

  .sheet-panel.top,
  .sheet-panel.bottom {
    left: 0;
    right: 0;
    height: var(--sheet-height, 300px);
    max-height: var(--sheet-max-height, 100vh);
  }

  .sheet-panel.top {
    top: 0;
    border-bottom: var(--sheet-border, none);
  }

  .sheet-panel.bottom {
    bottom: 0;
    border-top: var(--sheet-border, none);
  }

  .sheet-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--sheet-header-gap, 8px);
    padding: var(--sheet-header-padding, 16px 20px);
    background-color: var(--sheet-header-background, inherit);
    border-bottom: var(--sheet-header-border-bottom, 1px solid #e4e4e7);
    flex-shrink: 0;
  }

  .sheet-title {
    flex: 1;
    margin: var(--sheet-title-margin, 0);
    font-size: var(--sheet-title-font-size, 18px);
    font-weight: var(--sheet-title-font-weight, 600);
    font-family: var(--sheet-title-font-family, inherit);
    color: var(--sheet-title-color, currentColor);
    line-height: var(--sheet-title-line-height, 1.4);
  }

  .sheet-close-button {
    --button-width: var(--sheet-close-button-size, 32px);
    --button-height: var(--sheet-close-button-size, 32px);
    --button-border: none;
    --button-border-radius: var(--sheet-close-button-border-radius, 6px);
    --button-color: var(--sheet-close-button-background, transparent);
    --button-text-color: var(--sheet-close-button-color, currentColor);
    --button-font-size: var(--sheet-close-button-font-size, 16px);
    --button-padding: 0;
    --button-hover-color: var(--sheet-close-button-hover-background, transparent);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sheet-close-button :global(svg) {
    width: var(--sheet-close-icon-size, var(--sheet-close-button-font-size, 16px));
    height: var(--sheet-close-icon-size, var(--sheet-close-button-font-size, 16px));
  }

  .sheet-content {
    flex: 1;
    overflow-y: var(--sheet-content-overflow-y, auto);
    overscroll-behavior: var(--sheet-content-overscroll-behavior, contain);
    padding: var(--sheet-content-padding, 20px);
    scrollbar-width: var(--sheet-scrollbar-width, none);
  }

  .sheet-content::-webkit-scrollbar {
    display: none;
  }

  .sheet-footer {
    padding: var(--sheet-footer-padding, 16px 20px);
    background-color: var(--sheet-footer-background, inherit);
    border-top: var(--sheet-footer-border-top, 1px solid #e4e4e7);
    flex-shrink: 0;
  }
</style>
