<svelte:options
  customElement={{
    tag: 'pui-confetti',
    shadow: 'open',
    props: {
      pieces: { type: 'Number', reflect: true },
      origin: { type: 'String', reflect: true },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onconfettiend: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import Confetti from '$lib/Confetti/Confetti.svelte';
  let props = $props();
</script>

<Confetti {...props} />
