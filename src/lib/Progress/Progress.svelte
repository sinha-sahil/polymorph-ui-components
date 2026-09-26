<script lang="ts">
  import type { ProgressProperties } from './properties';

  let {
    value,
    max = 100,
    showLabel = false,
    ariaLabel,
    valueText,
    milestones = [],
    milestone,
    testId,
    classes
  }: ProgressProperties = $props();

  let clampedValue = $derived(Math.min(max, Math.max(0, value)));
  let percentage = $derived(max > 0 ? (clampedValue / max) * 100 : 0);
  let isIndeterminate = $derived(value < 0);

  let stops = $derived.by(() => {
    let previous = 0;
    return [...milestones]
      .sort((a, b) => a.value - b.value)
      .map((stop) => {
        const position = Math.min(max, Math.max(0, stop.value));
        const span = position - previous;
        previous = position;
        return { stop, span, reached: !isIndeterminate && value >= stop.value };
      });
  });
  let trailingSpan = $derived(max - Math.min(max, Math.max(0, stops.at(-1)?.stop.value ?? max)));
  let hasMilestoneLabels = $derived(
    stops.some(({ stop }) => typeof stop.label === 'string' && stop.label.length > 0)
  );
</script>

<div class="container {classes ?? ''}" data-pw={testId}>
  <div class="meter">
    <div class="rail" class:with-milestones={stops.length > 0}>
      <div class="track-layer">
        <div
          class="track"
          role="progressbar"
          aria-label={ariaLabel ?? 'Progress'}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={isIndeterminate ? null : clampedValue}
          aria-valuetext={valueText}
        >
          <div
            class="bar"
            class:indeterminate={isIndeterminate}
            style:width={isIndeterminate ? null : `${percentage}%`}
          ></div>
        </div>
      </div>
      {#if stops.length > 0}
        <div class="milestones">
          {#each stops as { stop, span, reached }, index (index)}
            <div class="segment" style:flex-grow={span}>
              <div class="milestone" class:reached>
                {#if typeof milestone === 'function'}
                  {@render milestone(stop, reached)}
                {:else}
                  <span class="milestone-marker"></span>
                {/if}
              </div>
            </div>
          {/each}
          {#if trailingSpan > 0}
            <div class="segment" style:flex-grow={trailingSpan}></div>
          {/if}
        </div>
      {/if}
    </div>
    {#if hasMilestoneLabels}
      <div class="milestone-labels">
        {#each stops as { stop, span }, index (index)}
          <span class="segment milestone-label" style:flex-grow={span}>{stop.label ?? ''}</span>
        {/each}
        {#if trailingSpan > 0}
          <span class="segment" style:flex-grow={trailingSpan}></span>
        {/if}
      </div>
    {/if}
  </div>
  {#if showLabel && !isIndeterminate}
    <div class="label">{Math.round(percentage)}%</div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    width: var(--progress-container-width, 100%);
    padding: var(--progress-container-padding, 0);
    gap: var(--progress-container-gap, 8px);
  }

  .meter {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--progress-milestone-label-gap, 8px);
  }

  .rail {
    position: relative;
    display: flex;
  }

  .track-layer {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .with-milestones .track-layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .track {
    flex: 1;
    height: var(--progress-track-height, 8px);
    background: var(--progress-track-background, #e4e4e7);
    border-radius: var(--progress-track-border-radius, 4px);
    overflow: hidden;
  }

  .bar {
    height: 100%;
    background: var(--progress-bar-background, currentColor);
    border-radius: var(--progress-bar-border-radius, 4px);
    transition: var(--progress-bar-transition, width 0.3s ease);
  }

  .bar.indeterminate {
    width: 30%;
    animation: indeterminate var(--progress-indeterminate-duration, 1.5s) ease-in-out infinite;
  }

  .milestones {
    flex: 1;
    display: flex;
    position: relative;
  }

  .segment {
    flex-basis: 0;
    flex-shrink: 1;
    min-width: 0;
    display: flex;
    justify-content: flex-end;
  }

  .milestone {
    display: flex;
  }

  .milestone-marker {
    width: var(--progress-milestone-size, 12px);
    height: var(--progress-milestone-size, 12px);
    border: var(--progress-milestone-border, 2px solid #ffffff);
    border-radius: var(--progress-milestone-border-radius, 50%);
    background: var(--progress-milestone-background, #e4e4e7);
    box-sizing: border-box;
  }

  .reached .milestone-marker {
    background: var(--progress-milestone-reached-background, currentColor);
  }

  .milestone-labels {
    display: flex;
    font-size: var(--progress-milestone-label-font-size, 12px);
    font-weight: var(--progress-milestone-label-font-weight, 400);
    color: var(--progress-milestone-label-color, currentColor);
    font-family: var(--progress-milestone-label-font-family, inherit);
  }

  .milestone-label {
    text-align: var(--progress-milestone-label-text-align, end);
  }

  .label {
    font-size: var(--progress-label-font-size, 14px);
    font-weight: var(--progress-label-font-weight, 500);
    color: var(--progress-label-color, currentColor);
    font-family: var(--progress-label-font-family, inherit);
    margin: var(--progress-label-margin, 0);
  }

  @keyframes indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(400%);
    }
  }
</style>
