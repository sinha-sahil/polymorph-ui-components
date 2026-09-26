# Loader

A rotating circular spinner with a gradient foreground that transitions from `--loader-foreground` to `--loader-foreground-end`. The center is cut out using an `::after` pseudo-element with `--loader-background` color, creating a ring/donut shape. Spins continuously with a linear animation (1.4s per turn by default). Pass `label` to name it for screen readers: the loader then becomes a `role="status"` region with the label as visually hidden text.

## Usage

```svelte
<script>
  import { Loader } from 'polymorph-ui-components';
</script>

<Loader />

<Loader label="Updating quantity" />
```

## Props

| Prop    | Type     | Required | Default | Description                                                                                                                                                            |
| ------- | -------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label   | `string` | No       | `-`     | Visually hidden text for screen readers. When set, the loader gets `role="status"`. Leave it out when surrounding content already says what is loading.          |
| testId  | `string` | No       | `-`     | Test selector value applied as `data-pw` on the outermost element.                                                                                                    |
| classes | `string` | No       | `-`     | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                        | Default      | CSS Property  | Description                                          |
| ------------------------------- | ------------ | ------------- | ---------------------------------------------------- |
| `--loader-font-size`            | `10px`       | font-size     | Font size (used internally for text-indent trick).   |
| `--loader-text-indent`          | `-9999em`    | text-indent   | Text indent to hide text content.                    |
| `--loader-width`                | `20px`       | width         | Width of the spinner.                                |
| `--loader-height`               | `20px`       | height        | Height of the spinner.                               |
| `--loader-border-radius`        | `50%`        | border-radius | Corner rounding of the spinner (50% for circle).     |
| `--loader-foreground`           | `currentColor` | background    | Gradient start color of the spinner ring.            |
| `--loader-foreground-end`       | `transparent`  | background    | Gradient end color of the spinner ring.              |
| `--loader-before-width`         | `10px`       | width         | Width of the ::before pseudo-element (top gradient). |
| `--loader-before-height`        | `10px`       | height        | Height of the ::before pseudo-element.               |
| `--loader-before-border-radius` | `100% 0 0 0` | border-radius | Corner rounding of the ::before element.             |
| `--loader-before-position`      | `absolute`   | position      | CSS position of the ::before element.                |
| `--loader-before-top`           | `0`          | top           | Top position of the ::before element.                |
| `--loader-before-left`          | `0`          | left          | Left position of the ::before element.               |
| `--loader-background`           | `#ffffff`    | background    | Color of the center cutout (creates the ring hole).  |
| `--loader-after-width`          | `15px`       | width         | Width of the center cutout circle.                   |
| `--loader-after-height`         | `15px`       | height        | Height of the center cutout circle.                  |
| `--loader-after-border-radius`  | `50%`        | border-radius | Corner rounding of the cutout (50% for circle).      |
| `--loader-after-position`       | `absolute`   | position      | CSS position of the cutout.                          |
| `--loader-after-top`            | `50%`        | top           | Top position of the cutout.                          |
| `--loader-after-left`           | `50%`        | left          | Left position of the cutout.                         |
| `--loader-duration`             | `1.4s`       | animation-duration | Time for one full turn. `0s` stops the spin, e.g. for reduced motion. |

## Accessibility

- Without `label` the loader is decorative and has no role.
- With `label` it is a `role="status"` region whose text is the label, hidden visually but available to screen readers. Screen readers differ on announcing a status region that appears already filled.

## Web Component

Tag: `<pui-loader>`

```html
<pui-loader></pui-loader>
```
