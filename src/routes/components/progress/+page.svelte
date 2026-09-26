<script lang="ts">
  import Button from '$lib/Button/Button.svelte';
  import Progress from '$lib/Progress/Progress.svelte';

  let progressValue = $state(65);
  let rewardsUnlocked = $state(1);

  const rewards = [
    { value: 1, label: 'Free shipping' },
    { value: 2, label: '10% off' },
    { value: 3, label: 'Free gift' }
  ];
</script>

<div class="page-header">
  <span class="category-badge">Feedback & Status</span>
  <h1>Progress</h1>
</div>

<div class="demo-row" style="max-width: 400px; flex-direction: column; gap: 12px;">
  <Progress value={progressValue} max={100} showLabel ariaLabel="Upload" />
  <div style="display: flex; gap: 8px;">
    <Button text="-10" onclick={() => (progressValue = Math.max(0, progressValue - 10))} />
    <Button text="+10" onclick={() => (progressValue = Math.min(100, progressValue + 10))} />
  </div>
</div>

<h2>Indeterminate</h2>
<div class="demo-row" style="max-width: 400px;">
  <Progress value={-1} />
</div>

<h2>Milestones</h2>
<div class="demo-row" style="max-width: 400px; flex-direction: column; gap: 12px;">
  <Progress
    value={rewardsUnlocked}
    max={rewards.length}
    ariaLabel="Rewards"
    valueText="{rewardsUnlocked} of {rewards.length} rewards unlocked"
    milestones={rewards}
  />
  <div style="display: flex; gap: 8px;">
    <Button text="-1" onclick={() => (rewardsUnlocked = Math.max(0, rewardsUnlocked - 1))} />
    <Button
      text="+1"
      onclick={() => (rewardsUnlocked = Math.min(rewards.length, rewardsUnlocked + 1))}
    />
  </div>
</div>

<h2>Custom milestone markers</h2>
<div class="demo-row" style="max-width: 400px;">
  <Progress
    value={150}
    max={400}
    ariaLabel="Free shipping"
    milestones={[{ value: 250 }, { value: 400 }]}
  >
    {#snippet milestone(stop, reached)}
      <span class="demo-marker" class:demo-marker-reached={reached}>${stop.value}</span>
    {/snippet}
  </Progress>
</div>

<style>
  .demo-marker {
    padding: 2px 6px;
    border-radius: 999px;
    background: #e4e4e7;
    font-size: 12px;
  }

  .demo-marker-reached {
    background: #18181b;
    color: #ffffff;
  }
</style>
