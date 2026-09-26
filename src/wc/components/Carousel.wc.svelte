<svelte:options
  customElement={{
    tag: 'pui-carousel',
    shadow: 'open',
    props: {
      views: { type: 'Object' },
      autoplay: { type: 'Boolean', reflect: true },
      autoplayInterval: { type: 'Number', reflect: true, attribute: 'autoplay-interval' },
      showDots: { type: 'Boolean', reflect: true, attribute: 'show-dots' },
      showArrows: { type: 'Boolean', reflect: true, attribute: 'show-arrows' },
      isScrollableLast: { type: 'Boolean', reflect: true, attribute: 'is-scrollable-last' },
      loop: { type: 'Boolean', reflect: true },
      announce: { type: 'Boolean', reflect: true },
      ariaLabel: { type: 'String', attribute: 'aria-label' },
      previousLabel: { type: 'String', attribute: 'previous-label' },
      nextLabel: { type: 'String', attribute: 'next-label' },
      previousIcon: { type: 'Object' },
      nextIcon: { type: 'Object' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onkeydown: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Carousel from '$lib/Carousel/Carousel.svelte';
  let props = $props();
</script>

<Carousel {...props} />
