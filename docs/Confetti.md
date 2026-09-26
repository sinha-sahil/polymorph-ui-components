# Confetti

A one-shot confetti burst for celebrating a moment, such as an unlocked reward or a finished task. Pieces rain from the top of the nearest positioned ancestor (or the viewport with `--confetti-position: fixed`), or burst out of its middle, bottom or bottom corners (`origin`), fluttering as they fall, then `onconfettiend` fires. The burst is decorative (`aria-hidden`) and never blocks clicks. It plays once per mount, so wrap it in `{#key}` to play it again. Under reduced motion nothing renders and `onconfettiend` fires straight away.

## Usage

```svelte
<script>
  import { Confetti } from 'polymorph-ui-components';

  let burst = $state(0);
</script>

<button onclick={() => (burst += 1)}>Celebrate</button>

<div style="position: relative; height: 300px;">
  {#key burst}
    {#if burst > 0}
      <Confetti />
    {/if}
  {/key}
</div>
```

## Props

| Prop    | Type     | Required | Default | Description                                                                                                                                                            |
| ------- | -------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pieces  | `number` | No       | `50`    | Number of confetti pieces. Values are rounded to the nearest integer and clamped to a minimum of 1.                                                                    |
| origin  | `ConfettiOrigin` | No       | `'top'` | Where the pieces come from: `top` rains across the top edge, `center` bursts out of the middle, `bottom` shoots up from the bottom middle like a fountain, and `sides` fires from both bottom corners. |
| testId  | `string` | No       | `-`     | Value for the data-pw attribute on the root element, used for end-to-end testing selectors.                                                                            |
| classes | `string` | No       | `-`     | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## Events

| Event         | Type         | Description                                                                                                        |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| onconfettiend | `() => void` | Fires once the last piece has fallen, or on mount under reduced motion. Use it to remove the burst from the page. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                         | Default    | CSS Property     | Description                                                                                               |
| -------------------------------- | ---------- | ---------------- | --------------------------------------------------------------------------------------------------------- |
| `--confetti-position`            | `absolute` | position         | `absolute` covers the nearest positioned ancestor; `fixed` covers the viewport.                           |
| `--confetti-z-index`             | `1000`     | z-index          | Stacking order of the burst.                                                                              |
| `--confetti-duration`            | `2400ms`   | animation        | Base fall time. Each piece falls in 0.6 to 1.4 times this.                                                |
| `--confetti-stagger`             | `0.4`      | animation-delay  | Share of the duration over which pieces start, so they don't all fall at once.                           |
| `--confetti-spread`              | `80px`     | transform        | Furthest a piece drifts sideways over its fall.                                                           |
| `--confetti-sway`                | `12px`     | transform        | How far each piece sways side to side as it flutters.                                                     |
| `--confetti-piece-width`         | `8px`      | width            | Width of each piece. Every third piece is a square of this size.                                          |
| `--confetti-piece-height`        | `14px`     | height           | Height of the rectangular pieces.                                                                         |
| `--confetti-piece-border-radius` | `2px`      | border-radius    | Corner rounding of each piece; `50%` gives dots.                                                          |
| `--confetti-color-1`             | `#f5b82e`  | background-color | First colour. Pieces cycle through the five colours in order.                                             |
| `--confetti-color-2`             | `#e8567c`  | background-color | Second colour.                                                                                            |
| `--confetti-color-3`             | `#3d8bfd`  | background-color | Third colour.                                                                                             |
| `--confetti-color-4`             | `#2fbf71`  | background-color | Fourth colour.                                                                                            |
| `--confetti-color-5`             | `#9b5de5`  | background-color | Fifth colour.                                                                                             |

## Type Reference

### ConfettiOrigin

```typescript
type ConfettiOrigin = 'top' | 'center' | 'bottom' | 'sides';
```

## Web Component

Tag: `<pui-confetti>`

```html
<pui-confetti pieces="60" origin="center"></pui-confetti>
```
