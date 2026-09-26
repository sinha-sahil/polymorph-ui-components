<script lang="ts">
  import Button from '$lib/Button/Button.svelte';
  import Countdown from '$lib/Countdown/Countdown.svelte';
  import Modal from '$lib/Modal/Modal.svelte';

  let showModal = $state(false);
  let showTimed = $state(false);
</script>

<div class="page-header">
  <span class="category-badge">Overlays</span>
  <h1>Modal</h1>
</div>

<div class="demo-row">
  <Button text="Open Modal" onclick={() => (showModal = true)} />
  {#if showModal}
    <Modal
      size="medium"
      align="center"
      showOverlay
      header={{ text: 'Confirm Action' }}
      footer={{
        primaryButton: { text: 'Confirm' },
        secondaryButton: { text: 'Cancel' }
      }}
      onclose={() => (showModal = false)}
      onoverlayclick={() => (showModal = false)}
      onprimarybuttonclick={() => {
        alert('Confirmed!');
        showModal = false;
      }}
      onsecondarybuttonclick={() => (showModal = false)}
    >
      {#snippet content()}
        <div style="padding: 16px;">
          <p>Are you sure you want to proceed with this action?</p>
        </div>
      {/snippet}
    </Modal>
  {/if}
</div>

<h3>Closes itself with a Countdown inside</h3>
<div class="demo-row">
  <Button onclick={() => (showTimed = true)}>Show for 4 seconds</Button>
  {#if showTimed}
    <Modal ariaLabel="Changes saved" onoverlayclick={() => (showTimed = false)}>
      {#snippet content()}
        <div style="display: flex; flex-direction: column;">
          <p style="padding: 24px 32px;">Your changes are saved.</p>
          <Countdown duration={4000} oncountdownend={() => (showTimed = false)} />
        </div>
      {/snippet}
    </Modal>
  {/if}
</div>
