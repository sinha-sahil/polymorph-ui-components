<script lang="ts">
  import { fade } from 'svelte/transition';
  import { prefersReducedMotion } from 'svelte/motion';
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
  };

  let { children }: Props = $props();
</script>

<div out:fade={{ duration: prefersReducedMotion.current ? 0 : 350 }}>
  {@render children?.()}
</div>
