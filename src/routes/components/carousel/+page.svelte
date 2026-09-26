<script lang="ts">
  import Carousel from '$lib/Carousel/Carousel.svelte';

  const announcements = [
    'Free shipping on orders over $50',
    'New arrivals every Friday',
    'Members get 10% off everything'
  ];
</script>

<div class="page-header">
  <span class="category-badge">Data Display</span>
  <h1>Carousel</h1>
</div>

<h3>Announcement bar (snippet slides, arrows, seamless loop)</h3>
<div class="demo-row" style="flex-direction: column; align-items: stretch; max-width: 520px;">
  <Carousel
    classes="demo-announcements"
    count={announcements.length}
    autoplay
    autoplayInterval={3000}
    loop
    showArrows
    ariaLabel="Announcements"
  >
    {#snippet slide(index)}
      <p class="demo-announcement">{announcements.at(index)}</p>
    {/snippet}
  </Carousel>
</div>

<h3>Dots, no looping</h3>
<div class="demo-row" style="flex-direction: column; align-items: stretch; max-width: 320px;">
  <Carousel classes="demo-cards" count={3} showDots ariaLabel="Cards">
    {#snippet slide(index)}
      <div class="demo-card">Card {index + 1}</div>
    {/snippet}
  </Carousel>
</div>

<style>
  :global(.demo-announcements) {
    --carousel-width: 100%;
    --carousel-height: fit-content;
    --carousel-arrow-hover-background: #0000000d;
  }

  :global(.demo-cards) {
    --carousel-width: 100%;
    --carousel-height: 120px;
  }

  .demo-announcement {
    margin: 0;
    padding: 8px 16px;
    text-align: center;
  }

  .demo-card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: 8px;
    background: #f4f4f5;
    font-weight: 600;
  }
</style>
