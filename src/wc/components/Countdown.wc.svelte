<svelte:options
  customElement={{
    tag: 'pui-countdown',
    shadow: 'open',
    props: {
      duration: { type: 'Number', reflect: true },
      ariaLabel: { type: 'String', attribute: 'aria-label' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      oncountdownend: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Countdown from '$lib/Countdown/Countdown.svelte';
  let props = $props();
</script>

<Countdown {...props} />
