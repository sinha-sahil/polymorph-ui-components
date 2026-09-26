<svelte:options
  customElement={{
    tag: 'pui-number-stepper',
    shadow: 'open',
    props: {
      value: { type: 'Number', reflect: true },
      min: { type: 'Number', reflect: true },
      max: { type: 'Number', reflect: true },
      step: { type: 'Number', reflect: true },
      disabled: { type: 'Boolean', reflect: true },
      ariaLabel: { type: 'String', attribute: 'aria-label' },
      decrementLabel: { type: 'String', attribute: 'decrement-label' },
      incrementLabel: { type: 'String', attribute: 'increment-label' },
      loadingLabel: { type: 'String', attribute: 'loading-label' },
      decrementIcon: { type: 'Object' },
      incrementIcon: { type: 'Object' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' },
      onchange: { type: 'Object' }
    }
  }}
/>

<script lang="ts">
  import NumberStepper from '$lib/NumberStepper/NumberStepper.svelte';
  let props = $props();
</script>

<NumberStepper {...props} />
