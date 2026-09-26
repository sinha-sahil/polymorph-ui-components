<script lang="ts">
  import { onMount } from 'svelte';
  import { prefersReducedMotion } from 'svelte/motion';
  import type { ConfettiOrigin, ConfettiProperties } from './properties';

  type Launch = {
    left: number;
    top: number;
    angle: number;
    spread: number;
    reachX: number;
    reachY: number;
    fall: number;
  };

  const CENTER: Launch = {
    left: 50,
    top: 50,
    angle: 90,
    spread: 360,
    reachX: 45,
    reachY: 35,
    fall: 40
  };
  const BOTTOM: Launch = {
    left: 50,
    top: 100,
    angle: 90,
    spread: 70,
    reachX: 45,
    reachY: 90,
    fall: 20
  };
  const LEFT: Launch = {
    left: 0,
    top: 100,
    angle: 60,
    spread: 30,
    reachX: 80,
    reachY: 75,
    fall: 20
  };
  const RIGHT: Launch = { ...LEFT, left: 100, angle: 120 };

  let {
    pieces = 50,
    origin = 'top',
    testId,
    classes,
    onconfettiend
  }: ConfettiProperties = $props();

  let count = $derived(Math.max(1, Math.round(pieces)));
  let landed = 0;

  // Irrational steps spread each value evenly, so the burst looks scattered but renders the same every time.
  function spread(index: number, step: number): number {
    return ((index + 1) * step) % 1;
  }

  function launchFor(from: Exclude<ConfettiOrigin, 'top'>, index: number): Launch {
    switch (from) {
      case 'center':
        return CENTER;
      case 'bottom':
        return BOTTOM;
      case 'sides':
        return index % 2 === 0 ? LEFT : RIGHT;
    }
  }

  function flakeFor(index: number, from: ConfettiOrigin) {
    const across = spread(index, 0.6180339887);
    const lag = spread(index, 0.7548776662);
    const speed = 0.6 + spread(index, 0.569840291) * 0.8;
    const power = spread(index, 0.4142135624);
    const spin = (1 + spread(index, 0.7320508076) * 2) * (index % 2 === 0 ? 1 : -1);
    if (from === 'top') {
      return {
        left: across * 100,
        top: -5,
        dx: (power * 2 - 1) * 15,
        rise: 0,
        drop: 110,
        lag,
        speed,
        spin
      };
    }
    const launch = launchFor(from, index);
    const angle = ((launch.angle + (across - 0.5) * launch.spread) * Math.PI) / 180;
    const force = 0.25 + power * 0.75;
    const rise = Math.sin(angle) * force * launch.reachY;
    return {
      left: launch.left,
      top: launch.top,
      dx: Math.cos(angle) * force * launch.reachX,
      rise,
      drop: Math.max(rise, 0) + launch.fall,
      lag: lag / 4,
      speed,
      spin
    };
  }

  let flakes = $derived(Array.from({ length: count }, (_, index) => flakeFor(index, origin)));

  function handleAnimationEnd(event: AnimationEvent) {
    if (event.target !== event.currentTarget) {
      return;
    }
    landed += 1;
    if (landed === count) {
      onconfettiend?.();
    }
  }

  onMount(() => {
    if (prefersReducedMotion.current) {
      onconfettiend?.();
    }
  });
</script>

{#if !prefersReducedMotion.current}
  <div class="confetti {classes ?? ''}" data-origin={origin} aria-hidden="true" data-pw={testId}>
    {#each flakes as flake, index (index)}
      <span
        class="confetti-drift"
        style:--left="{flake.left}%"
        style:--top="{flake.top}%"
        style:--dx="{flake.dx}%"
        style:--rise="{flake.rise}%"
        style:--drop="{flake.drop}%"
        style:--lag={flake.lag}
        style:--speed={flake.speed}
        style:--spin={flake.spin}
        onanimationend={handleAnimationEnd}
      >
        <span class="confetti-flight">
          <span class="confetti-piece"></span>
        </span>
      </span>
    {/each}
  </div>
{/if}

<style>
  .confetti {
    position: var(--confetti-position, absolute);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--confetti-z-index, 1000);
    overflow: hidden;
    pointer-events: none;
  }

  .confetti-drift {
    --flight-duration: calc(var(--confetti-duration, 2400ms) * var(--speed));
    --flight-delay: calc(
      var(--confetti-duration, 2400ms) * var(--confetti-stagger, 0.4) * var(--lag)
    );
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    animation: confetti-drift var(--flight-duration) cubic-bezier(0.2, 0.6, 0.35, 1)
      var(--flight-delay) both;
  }

  .confetti-flight {
    position: absolute;
    top: 0;
    left: var(--left);
    height: 100%;
    animation: confetti-flight var(--flight-duration) linear var(--flight-delay) both;
  }

  .confetti[data-origin='top'] .confetti-flight {
    animation-name: confetti-fall;
  }

  .confetti-piece {
    display: block;
    width: var(--confetti-piece-width, 8px);
    height: var(--confetti-piece-height, 14px);
    border-radius: var(--confetti-piece-border-radius, 2px);
    background-color: var(--confetti-color-1, #f5b82e);
    animation: confetti-flutter var(--flight-duration) linear var(--flight-delay) both;
  }

  .confetti-drift:nth-child(3n) .confetti-piece {
    height: var(--confetti-piece-width, 8px);
  }

  .confetti-drift:nth-child(5n + 2) .confetti-piece {
    background-color: var(--confetti-color-2, #e8567c);
  }

  .confetti-drift:nth-child(5n + 3) .confetti-piece {
    background-color: var(--confetti-color-3, #3d8bfd);
  }

  .confetti-drift:nth-child(5n + 4) .confetti-piece {
    background-color: var(--confetti-color-4, #2fbf71);
  }

  .confetti-drift:nth-child(5n + 5) .confetti-piece {
    background-color: var(--confetti-color-5, #9b5de5);
  }

  @keyframes confetti-drift {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(var(--dx));
    }
  }

  @keyframes confetti-fall {
    from {
      transform: translateY(var(--top));
    }
    to {
      transform: translateY(calc(var(--top) + var(--drop)));
    }
  }

  @keyframes confetti-flight {
    0% {
      transform: translateY(var(--top));
      animation-timing-function: cubic-bezier(0.25, 0.6, 0.5, 1);
    }
    30% {
      transform: translateY(calc(var(--top) - var(--rise)));
      animation-timing-function: cubic-bezier(0.45, 0, 0.75, 0.6);
    }
    100% {
      transform: translateY(calc(var(--top) - var(--rise) + var(--drop)));
    }
  }

  @keyframes confetti-flutter {
    0% {
      transform: translateX(0) rotate3d(1, 1, 0, 0turn);
      opacity: 1;
    }
    25% {
      transform: translateX(var(--confetti-sway, 12px))
        rotate3d(1, 1, 0, calc(var(--spin) * 0.25turn));
    }
    50% {
      transform: translateX(0) rotate3d(1, 1, 0, calc(var(--spin) * 0.5turn));
    }
    75% {
      transform: translateX(calc(var(--confetti-sway, 12px) * -1))
        rotate3d(1, 1, 0, calc(var(--spin) * 0.75turn));
    }
    85% {
      opacity: 1;
    }
    100% {
      transform: translateX(0) rotate3d(1, 1, 0, calc(var(--spin) * 1turn));
      opacity: 0;
    }
  }
</style>
