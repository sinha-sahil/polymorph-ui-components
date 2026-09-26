<script lang="ts">
  import type { CountdownProperties } from './properties';

  let { duration, ariaLabel, testId, classes, oncountdownend }: CountdownProperties = $props();

  let seconds = $derived(Math.max(1, Math.round(duration / 1000)));
</script>

<div
  class="countdown {classes ?? ''}"
  role={typeof ariaLabel === 'string' ? 'timer' : null}
  aria-label={ariaLabel}
  aria-hidden={typeof ariaLabel === 'string' ? null : 'true'}
  data-pw={testId}
>
  <div
    class="countdown-fill"
    style:animation-duration="{duration}ms"
    style:--countdown-steps={seconds}
    onanimationend={() => oncountdownend?.()}
  ></div>
</div>

<style>
  .countdown {
    display: flex;
    width: var(--countdown-width, 100%);
    height: var(--countdown-height, 4px);
    border-radius: var(--countdown-border-radius, 0);
    background-color: var(--countdown-track-color, #e4e4e7);
    overflow: hidden;
  }

  .countdown-fill {
    flex: 1;
    background-color: var(--countdown-color, #18181b);
    transform-origin: var(--countdown-origin, left);
    animation-name: countdown-drain;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .countdown-fill {
      animation-timing-function: steps(var(--countdown-steps), end);
    }
  }

  @keyframes countdown-drain {
    from {
      transform: scaleX(1);
    }
    to {
      transform: scaleX(0);
    }
  }
</style>
