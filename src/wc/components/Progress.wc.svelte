<svelte:options
  customElement={{
    tag: 'pui-progress',
    shadow: 'open',
    props: {
      value: { type: 'Number', reflect: true },
      max: { type: 'Number', reflect: true },
      showLabel: { type: 'Boolean', reflect: true, attribute: 'show-label' },
      ariaLabel: { type: 'String', attribute: 'aria-label' },
      valueText: { type: 'String', attribute: 'value-text' },
      milestones: { type: 'Object' },
      milestone: { type: 'Object' },
      testId: { type: 'String', attribute: 'test-id' },
      classes: { type: 'String' }
    }
  }}
/>

<script lang="ts">
  import Progress from '$lib/Progress/Progress.svelte';
  let props = $props();
</script>

<Progress {...props} />
