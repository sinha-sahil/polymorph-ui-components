<script lang="ts">
  import Button from '$lib/Button/Button.svelte';

  let saving = $state(false);
  let saves = $state(0);

  function save(event: SubmitEvent): void {
    event.preventDefault();
    saves += 1;
    saving = true;
    setTimeout(() => (saving = false), 1500);
  }
</script>

<div class="page-header">
  <span class="category-badge">Buttons & Actions</span>
  <h1>Button</h1>
</div>

<div class="demo-row">
  <Button text="Primary" onclick={() => alert('Clicked!')} />
  <Button text="Disabled" enable={false} />
  <Button text="With Loader" showLoader loaderType="Circular" />
</div>

<h3>Busy, still focusable</h3>
<form class="demo-row" style="align-items: center;" onsubmit={save}>
  <Button type="submit" ariaDisabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
  <span>Saves: {saves}</span>
</form>
