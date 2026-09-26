<script lang="ts">
  import type { Snippet } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';
  import type { ModalAlign } from '$lib/Modal/properties';
  import type { ModalTransition } from '$lib/types';

  type Props = {
    enable?: boolean;
    align?: ModalAlign;
    transitionType?: ModalTransition;
    children?: Snippet;
  };

  let { enable = true, align = 'bottom', transitionType = 'ALL', children }: Props = $props();

  let flyAnimationProperties = $derived.by(() => {
    const base = { x: 0, y: 0, duration: prefersReducedMotion.current ? 0 : 380 };

    switch (align) {
      case 'top':
        return { ...base, y: -30 };
      case 'bottom':
        return { ...base, y: 300 };
      default:
        return base;
    }
  });

  let fadeAnimationProperties = $derived({ duration: prefersReducedMotion.current ? 0 : 300 });

  let useFlyAnimation = $derived(align === 'top' || align === 'bottom');
  let useOutTransition = $derived(transitionType === 'ALL');
</script>

{#if enable}
  {#if useFlyAnimation && useOutTransition}
    <div in:fly|global={flyAnimationProperties} out:fly|global={flyAnimationProperties}>
      {@render children?.()}
    </div>
  {:else if useFlyAnimation}
    <div in:fly|global={flyAnimationProperties}>
      {@render children?.()}
    </div>
  {:else if useOutTransition}
    <div in:fade|global={fadeAnimationProperties} out:fade|global={fadeAnimationProperties}>
      {@render children?.()}
    </div>
  {:else}
    <div in:fade|global={fadeAnimationProperties}>
      {@render children?.()}
    </div>
  {/if}
{:else}
  {@render children?.()}
{/if}
