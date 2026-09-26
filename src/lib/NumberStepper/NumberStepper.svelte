<script lang="ts">
  import { tick } from 'svelte';
  import type { NumberStepperProperties } from './properties';
  import Button from '../Button/Button.svelte';
  import Loader from '../Loader/Loader.svelte';
  import minusSvg from '$lib/assets/minus.svg?raw';
  import addSvg from '$lib/assets/add.svg?raw';
  import { deepActiveElement } from '$lib/utils';

  let {
    value,
    min = 0,
    max = Number.POSITIVE_INFINITY,
    step = 1,
    disabled = false,
    ariaLabel = 'Quantity',
    decrementLabel = 'Decrease',
    incrementLabel = 'Increase',
    loadingLabel = 'Updating',
    decrementIcon,
    incrementIcon,
    testId,
    onchange,
    classes
  }: NumberStepperProperties = $props();

  let pending = $state(false);
  let decrementButton: ReturnType<typeof Button> | null = $state(null);
  let incrementButton: ReturnType<typeof Button> | null = $state(null);
  let canDecrement = $derived(!disabled && value - step >= min);
  let canIncrement = $derived(!disabled && value + step <= max);

  async function change(next: number, pressed: ReturnType<typeof Button> | null): Promise<void> {
    if (pending) {
      return;
    }
    const pressedElement = pressed?.getButtonRef() ?? null;
    const hadFocus = pressedElement !== null && deepActiveElement() === pressedElement;

    const result = onchange?.(next);
    if (result instanceof Promise) {
      pending = true;
      try {
        await result;
      } finally {
        pending = false;
      }
    }

    await tick();
    const other = (pressed === incrementButton ? decrementButton : incrementButton)?.getButtonRef();
    if (hadFocus && pressedElement.disabled && other instanceof HTMLElement && !other.disabled) {
      other.focus();
    }
  }
</script>

<div
  class="number-stepper {classes ?? ''}"
  class:pending
  role="group"
  aria-label={ariaLabel}
  aria-busy={pending}
  data-pw={testId}
>
  <div class="number-stepper-button">
    <Button
      bind:this={decrementButton}
      ariaLabel={decrementLabel}
      disabled={!canDecrement}
      onclick={() => change(value - step, decrementButton)}
      {...typeof testId === 'string' ? { testId: `${testId}-decrement` } : {}}
    >
      {#if typeof decrementIcon === 'function'}
        {@render decrementIcon(value)}
      {:else}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html minusSvg}
      {/if}
    </Button>
  </div>
  <span class="number-stepper-value" aria-live="polite">
    {#if pending}
      <Loader label={loadingLabel} />
    {:else}
      {value}
    {/if}
  </span>
  <div class="number-stepper-button">
    <Button
      bind:this={incrementButton}
      ariaLabel={incrementLabel}
      disabled={!canIncrement}
      onclick={() => change(value + step, incrementButton)}
      {...typeof testId === 'string' ? { testId: `${testId}-increment` } : {}}
    >
      {#if typeof incrementIcon === 'function'}
        {@render incrementIcon(value)}
      {:else}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html addSvg}
      {/if}
    </Button>
  </div>
</div>

<style>
  .number-stepper {
    display: inline-flex;
    align-items: center;
    gap: var(--number-stepper-gap, 0);
    padding: var(--number-stepper-padding, 0);
    border: var(--number-stepper-border, 1px solid currentColor);
    border-radius: var(--number-stepper-border-radius, 6px);
    background: var(--number-stepper-background, transparent);
    color: var(--number-stepper-color, currentColor);
  }

  .number-stepper-button {
    --button-color: var(--number-stepper-button-background, transparent);
    --button-text-color: var(--number-stepper-button-color, currentColor);
    --button-hover-color: var(--number-stepper-button-hover-background, transparent);
    --button-padding: var(--number-stepper-button-padding, 6px);
    --button-border: none;
    --button-border-radius: var(--number-stepper-button-border-radius, 6px);
    --button-disabled-opacity: var(--number-stepper-button-disabled-opacity, 0.4);
    display: flex;
  }

  .pending .number-stepper-button {
    --button-cursor: var(--number-stepper-pending-cursor, progress);
    opacity: var(--number-stepper-button-disabled-opacity, 0.4);
  }

  .number-stepper-button :global(svg) {
    width: var(--number-stepper-icon-size, 14px);
    height: var(--number-stepper-icon-size, 14px);
  }

  .number-stepper-value {
    --loader-width: var(--number-stepper-loader-size, 14px);
    --loader-height: var(--number-stepper-loader-size, 14px);
    --loader-before-width: calc(var(--number-stepper-loader-size, 14px) / 2);
    --loader-before-height: calc(var(--number-stepper-loader-size, 14px) / 2);
    --loader-after-width: calc(var(--number-stepper-loader-size, 14px) * 0.75);
    --loader-after-height: calc(var(--number-stepper-loader-size, 14px) * 0.75);
    display: flex;
    justify-content: center;
    min-width: var(--number-stepper-value-min-width, 24px);
    font-size: var(--number-stepper-value-font-size, 14px);
    font-weight: var(--number-stepper-value-font-weight, 500);
    font-variant-numeric: var(--number-stepper-value-font-variant-numeric, tabular-nums);
  }
</style>
