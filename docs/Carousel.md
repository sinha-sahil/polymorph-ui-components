# Carousel

A slideshow for content or announcements. Slides come from a `slide` snippet (called with each index up to `count`) or from `views`, an array of Svelte components. Slides are as wide as the carousel, so any `--carousel-width` works, including percentages. Navigation: optional previous/next arrows, dot indicators, touch swipe and mouse drag (20px threshold). `isScrollableLast` lets navigation wrap from the last slide to the first (rewinding across the slides); `loop` wraps seamlessly instead, sliding forward into the first slide through a hidden copy. Autoplay pauses while the pointer is over the carousel or focus is inside it, and follows changes to `autoplay` and `autoplayInterval`.

## Usage

```svelte
<script>
  import { Carousel } from 'polymorph-ui-components';

  const messages = ['Free shipping over $50', 'New arrivals every Friday'];
</script>

<Carousel
  count={messages.length}
  autoplay
  autoplayInterval={4000}
  loop
  showArrows
  ariaLabel="Announcements"
>
  {#snippet slide(index)}
    <p>{messages[index]}</p>
  {/snippet}
</Carousel>

<Carousel views={[{ component: SlideOne }, { component: SlideTwo, properties: { tone: 'dark' } }]} showDots />
```

## Props

| Prop             | Type             | Required | Default            | Description                                                                                                                                             |
| ---------------- | ---------------- | -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| count            | `number`         | No       | `0`                | Number of slides rendered by the `slide` snippet. Ignored without `slide`.                                                                              |
| views            | `CarouselView[]` | No       | `[]`               | Slides as Svelte components, each with optional properties passed as a single `properties` prop. Used when there is no `slide` snippet.                  |
| autoplay         | `boolean`        | No       | `false`            | When true, the carousel advances every `autoplayInterval`. It pauses while hovered or focused, and never runs with fewer than two slides.               |
| autoplayInterval | `number`         | No       | `1000`             | Time in milliseconds between automatic slide transitions. Manual navigation restarts the timer.                                                         |
| showDots         | `boolean`        | No       | `false`            | When true, shows dot indicators below the carousel for direct slide navigation.                                                                         |
| showArrows       | `boolean`        | No       | `false`            | When true (and there are at least two slides), shows previous/next buttons on either side of the slides.                                               |
| isScrollableLast | `boolean`        | No       | `false`            | When true, next on the last slide goes to the first and previous on the first goes to the last, animating back across the slides.                     |
| loop             | `boolean`        | No       | `false`            | Like `isScrollableLast`, but seamless: the carousel keeps moving in the same direction through hidden copies of the first and last slides. Those copies mount the slide content a second time. |
| announce         | `boolean`        | No       | `true`             | When true, a slide the user moves to is announced (`aria-live="polite"`) unless autoplay is rotating. Set false when slides contain text that keeps changing, such as a countdown, or every change is read out. |
| ariaLabel        | `string`         | No       | `'Carousel'`       | Accessible name of the carousel region, e.g. `Announcements`.                                                                                           |
| previousLabel    | `string`         | No       | `'Previous slide'` | Accessible name of the previous button.                                                                                                                 |
| nextLabel        | `string`         | No       | `'Next slide'`     | Accessible name of the next button.                                                                                                                     |
| testId           | `string`         | No       | `-`                | Test selector value applied as `data-pw` on the outermost element.                                                                                      |
| classes          | `string`         | No       | `-`                | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## Snippets

Svelte 5 Snippet props — pass content blocks to the component.

| Snippet      | Type                | Description                                                                                          |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------- |
| slide        | `Snippet<[number]>` | Renders the slide at the given index. Preferred over `views` for text or markup slides.             |
| previousIcon | `Snippet`           | Icon inside the previous button. Falls back to a left chevron. Sized by `--carousel-arrow-size`.     |
| nextIcon     | `Snippet`           | Icon inside the next button. Falls back to a right chevron. Sized by `--carousel-arrow-size`.        |

## Events

| Event     | Type                             | Description                                                  |
| --------- | -------------------------------- | ------------------------------------------------------------ |
| onkeydown | `(event: KeyboardEvent) => void` | Fires when a key is pressed while a dot indicator has focus. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                           | Default        | CSS Property        | Description                                                                                         |
| ---------------------------------- | -------------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| `--carousel-width`                 | `300px`        | width, flex-basis   | Width of the carousel. Any unit works, including `100%`. `.carousel-container` uses it without a fallback. |
| `--carousel-height`                | `100px`        | height              | Height of the slides. `fit-content` sizes the carousel to its tallest slide.                        |
| `--carousel-shadow`                | `-`            | box-shadow          | Box shadow of the carousel.                                                                         |
| `--carousel-border-radius`         | `0%`           | border-radius       | Corner rounding of the carousel.                                                                    |
| `--carousel-transition-duration`   | `0.5s`         | transition-duration | Duration of the slide movement. Zero under `prefers-reduced-motion: reduce`, so slides change without animating (autoplay still advances). |
| `--carousel-transition-easing`     | `ease-in-out`  | transition-timing-function | Easing of the slide movement.                                                               |
| `--carousel-arrow-gap`             | `8px`          | gap                 | Space between the arrows and the slides.                                                            |
| `--carousel-arrow-size`            | `16px`         | width, height       | Size of the arrow icons.                                                                            |
| `--carousel-arrow-padding`         | `4px`          | padding             | Padding inside the arrow buttons.                                                                   |
| `--carousel-arrow-background`      | `transparent`  | background          | Background of the arrow buttons.                                                                    |
| `--carousel-arrow-hover-background`| `transparent`  | background          | Background of a hovered arrow button.                                                               |
| `--carousel-arrow-color`           | `currentColor` | color               | Icon colour of the arrow buttons.                                                                   |
| `--carousel-arrow-border`          | `none`         | border              | Border of the arrow buttons.                                                                        |
| `--carousel-arrow-border-radius`   | `999px`        | border-radius       | Corner rounding of the arrow buttons.                                                               |
| `--carousel-dot-gap`               | `10px`         | gap                 | Gap between dot indicators.                                                                         |
| `--carousel-dot-padding-top`       | `10px`         | padding-top         | Top padding above the dot indicators.                                                               |
| `--carousel-dot-width`             | `5px`          | width               | Width of each dot indicator.                                                                        |
| `--carousel-dot-height`            | `5px`          | height              | Height of each dot indicator.                                                                       |
| `--carousel-dot-color`             | `currentColor` | background          | Background color of inactive dot indicators.                                                        |
| `--carousel-active-dot-color`      | `currentColor` | background          | Background color of the active dot indicator.                                                       |

## Accessibility

- The root is a `role="region"` with `aria-roledescription="carousel"`, named by `ariaLabel`.
- Each slide is a `role="group"` with `aria-roledescription="slide"` and a label like `2 of 3`. Slides that are off screen are `aria-hidden` and `inert`, so their links and buttons can't be tabbed to; the copies used by `loop` are always hidden.
- The slide area is `aria-live="polite"` when the user is in control and `off` while autoplay rotates it, so rotation isn't announced every few seconds. `announce={false}` keeps it `off`.
- Autoplay pauses while the pointer is over the carousel or focus is inside it.
- Arrows are real buttons named by `previousLabel` and `nextLabel`.

## Type Reference

Custom types used by this component's props and events:

### CarouselView

```typescript
type CarouselView = {
  properties?: Record<string, unknown>;
  component: Component<Record<string, unknown>>;
};
```

`MandatoryCarouselProperties` (`{ views: CarouselView[] }`) is still exported but deprecated: `views` is optional now.

## Internal Dependencies

This component uses the following library components internally:

- Button (for the previous and next arrows)

## Web Component

Tag: `<pui-carousel>`

```html
<pui-carousel autoplay show-dots show-arrows loop aria-label="Featured"></pui-carousel>
```

> **Note:** The `views` prop is an array — set it via JavaScript property. Snippet slides are Svelte only.
