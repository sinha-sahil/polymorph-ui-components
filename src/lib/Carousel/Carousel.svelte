<script lang="ts">
  import { flushSync } from 'svelte';
  import type { CarouselProperties } from './properties';
  import Button from '../Button/Button.svelte';
  import chevronLeftSvg from '$lib/assets/chevron-left.svg?raw';
  import chevronRightSvg from '$lib/assets/chevron-right.svg?raw';

  type Rotation = { enabled: boolean; interval: number; restarts: number };

  let {
    views = [],
    count = 0,
    slide,
    autoplay = false,
    autoplayInterval = 1000,
    showDots = false,
    showArrows = false,
    isScrollableLast = false,
    loop = false,
    announce = true,
    ariaLabel = 'Carousel',
    previousLabel = 'Previous slide',
    nextLabel = 'Next slide',
    previousIcon,
    nextIcon,
    testId,
    onkeydown,
    classes
  }: CarouselProperties = $props();

  let slidesDiv: HTMLDivElement | null = $state(null);
  let requestedIndex = $state(0);
  let edge = $state<'none' | 'before' | 'after'>('none');
  let hovered = $state(false);
  let focused = $state(false);
  let animate = $state(true);
  let restarts = $state(0);

  let total = $derived(typeof slide === 'function' ? count : views.length);
  let activeSlideIndex = $derived(Math.min(requestedIndex, Math.max(total - 1, 0)));
  let wraps = $derived(isScrollableLast || loop);
  let seamless = $derived(loop && total > 1);
  let trackPosition = $derived.by(() => {
    if (!seamless) {
      return activeSlideIndex;
    }
    if (edge === 'before') {
      return 0;
    }
    if (edge === 'after') {
      return total + 1;
    }
    return activeSlideIndex + 1;
  });
  let rotating = $derived(autoplay && total > 1 && !hovered && !focused);

  function hasTransition(): boolean {
    return slidesDiv !== null && parseFloat(getComputedStyle(slidesDiv).transitionDuration) > 0;
  }

  function snapFromClone() {
    animate = false;
    edge = 'none';
    flushSync();
    if (slidesDiv !== null) {
      void slidesDiv.offsetWidth;
    }
    animate = true;
  }

  function moveTo(target: number) {
    if (total === 0) {
      return;
    }
    if (edge !== 'none') {
      snapFromClone();
    }
    if (wraps) {
      requestedIndex = ((target % total) + total) % total;
      edge = seamless && target < 0 ? 'before' : seamless && target >= total ? 'after' : 'none';
    } else {
      requestedIndex = Math.min(total - 1, Math.max(0, target));
    }
    flushSync();
    if (edge !== 'none' && !hasTransition()) {
      snapFromClone();
    }
  }

  function navigate(target: number) {
    moveTo(target);
    restarts += 1;
  }

  function handleTransitionEnd(event: TransitionEvent) {
    if (event.target === slidesDiv && event.propertyName === 'transform' && edge !== 'none') {
      snapFromClone();
    }
  }

  function handleDotKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(index);
    }
    onkeydown?.(event);
  }

  function nextSlide() {
    if (activeSlideIndex !== total - 1 || wraps) {
      navigate(activeSlideIndex + 1);
    }
  }

  function previousSlide() {
    if (activeSlideIndex !== 0 || wraps) {
      navigate(activeSlideIndex - 1);
    }
  }

  function advance() {
    if (rotating) {
      moveTo(activeSlideIndex + 1);
    }
  }

  function rotation(_node: HTMLElement, initial: Rotation) {
    let timer: number | null = null;
    const stop = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };
    const start = (settings: Rotation) => {
      stop();
      if (settings.enabled) {
        timer = window.setInterval(advance, settings.interval);
      }
    };
    start(initial);
    return { update: start, destroy: stop };
  }

  function swipe(node: HTMLElement) {
    let startX = 0;
    const finish = (endX: number) => {
      if (startX - endX > 20) {
        nextSlide();
      } else if (endX - startX > 20) {
        previousSlide();
      }
    };
    const touchStart = (event: TouchEvent) => {
      const touch = event.touches.item(0);
      if (touch !== null) {
        startX = touch.clientX;
      }
    };
    const touchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches.item(0);
      if (touch !== null) {
        finish(touch.clientX);
      }
    };
    const mouseDown = (event: MouseEvent) => {
      startX = event.clientX;
    };
    const mouseUp = (event: MouseEvent) => {
      finish(event.clientX);
    };
    node.addEventListener('touchstart', touchStart);
    node.addEventListener('touchend', touchEnd);
    node.addEventListener('mousedown', mouseDown);
    node.addEventListener('mouseup', mouseUp);
    return {
      destroy() {
        node.removeEventListener('touchstart', touchStart);
        node.removeEventListener('touchend', touchEnd);
        node.removeEventListener('mousedown', mouseDown);
        node.removeEventListener('mouseup', mouseUp);
      }
    };
  }

  function handleFocusOut(event: FocusEvent) {
    const container = event.currentTarget;
    if (
      container instanceof Node &&
      event.relatedTarget instanceof Node &&
      container.contains(event.relatedTarget)
    ) {
      return;
    }
    focused = false;
  }
</script>

{#snippet renderSlide(index: number)}
  {#if typeof slide === 'function'}
    {@render slide(index)}
  {:else}
    {@const view = views.at(index)}
    {#if typeof view === 'object'}
      {#if typeof view.properties === 'object'}
        <view.component properties={view.properties} />
      {:else}
        <view.component />
      {/if}
    {/if}
  {/if}
{/snippet}

<div
  class="carousel-container {classes ?? ''}"
  role="region"
  aria-roledescription="carousel"
  aria-label={ariaLabel}
  data-pw={testId}
  use:rotation={{ enabled: autoplay && total > 1, interval: autoplayInterval, restarts }}
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
  onfocusin={() => (focused = true)}
  onfocusout={handleFocusOut}
>
  {#if total > 0}
    <div class="carousel-row">
      {#if showArrows && total > 1}
        <div class="carousel-arrow">
          <Button ariaLabel={previousLabel} onclick={previousSlide}>
            {#if typeof previousIcon === 'function'}
              {@render previousIcon()}
            {:else}
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html chevronLeftSvg}
            {/if}
          </Button>
        </div>
      {/if}
      <div class="carousel" use:swipe>
        <div
          class="slidesDiv"
          class:animate
          bind:this={slidesDiv}
          style:transform="translateX({-trackPosition * 100}%)"
          aria-live={announce && !rotating ? 'polite' : 'off'}
          ontransitionend={handleTransitionEnd}
        >
          {#if seamless}
            <div class="current-slide" aria-hidden="true" inert>
              {@render renderSlide(total - 1)}
            </div>
          {/if}
          {#each { length: total } as _, index (index)}
            <div
              class="current-slide"
              role="group"
              aria-roledescription="slide"
              aria-label="{index + 1} of {total}"
              aria-hidden={index !== activeSlideIndex}
              inert={index !== activeSlideIndex}
            >
              {@render renderSlide(index)}
            </div>
          {/each}
          {#if seamless}
            <div class="current-slide" aria-hidden="true" inert>
              {@render renderSlide(0)}
            </div>
          {/if}
        </div>
      </div>
      {#if showArrows && total > 1}
        <div class="carousel-arrow">
          <Button ariaLabel={nextLabel} onclick={nextSlide}>
            {#if typeof nextIcon === 'function'}
              {@render nextIcon()}
            {:else}
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html chevronRightSvg}
            {/if}
          </Button>
        </div>
      {/if}
    </div>
  {/if}
  {#if showDots}
    <div class="dots-wrapper">
      {#each { length: total } as _, index (index)}
        <div
          class={activeSlideIndex === index ? 'active-dot' : 'dot'}
          onclick={() => navigate(index)}
          onkeydown={(event) => handleDotKeydown(event, index)}
          role="button"
          tabindex="0"
          aria-label={`Go to slide ${index + 1}`}
          aria-current={activeSlideIndex === index}
        ></div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .carousel-container {
    width: var(--carousel-width);
  }
  .carousel-row {
    display: flex;
    align-items: center;
    gap: var(--carousel-arrow-gap, 8px);
  }
  .current-slide {
    width: 100%;
    height: var(--carousel-height, 100px);
    flex-shrink: 0;
  }
  .carousel {
    box-shadow: var(--carousel-shadow);
    height: var(--carousel-height, 100px);
    flex: 0 1 var(--carousel-width, 300px);
    min-width: 0;
    overflow: hidden;
    border-radius: var(--carousel-border-radius, 0%);
  }
  .carousel:active {
    cursor: grabbing;
  }
  .slidesDiv {
    display: flex;
  }
  .slidesDiv.animate {
    transition: transform var(--carousel-transition-duration, 0.5s)
      var(--carousel-transition-easing, ease-in-out);
  }
  .carousel-arrow {
    --button-color: var(--carousel-arrow-background, transparent);
    --button-text-color: var(--carousel-arrow-color, currentColor);
    --button-hover-color: var(--carousel-arrow-hover-background, transparent);
    --button-padding: var(--carousel-arrow-padding, 4px);
    --button-border: var(--carousel-arrow-border, none);
    --button-border-radius: var(--carousel-arrow-border-radius, 999px);
    display: flex;
    flex-shrink: 0;
  }
  .carousel-arrow :global(svg) {
    width: var(--carousel-arrow-size, 16px);
    height: var(--carousel-arrow-size, 16px);
  }
  .dots-wrapper {
    gap: var(--carousel-dot-gap, 10px);
    padding-top: var(--carousel-dot-padding-top, 10px);
    display: flex;
    justify-content: center;
  }
  .dot {
    width: var(--carousel-dot-width, 5px);
    height: var(--carousel-dot-height, 5px);
    border-radius: 50%;
    background: var(--carousel-dot-color, currentColor);
    cursor: pointer;
    transition: 0.3s ease;
  }

  .active-dot {
    width: var(--carousel-dot-width, 5px);
    height: var(--carousel-dot-height, 5px);
    border-radius: 50%;
    cursor: pointer;
    background: var(--carousel-active-dot-color, currentColor);
    transition: 0.3s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .slidesDiv.animate,
    .dot,
    .active-dot {
      transition-duration: 0s;
    }
  }
</style>
