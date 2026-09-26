# EmptyState

A centred placeholder for an area with nothing to show yet: an empty cart, a search with no results, a list still loading. Stacks an optional icon, a title, an optional description and optional actions. Set `announce` to make it a `role="status"` live region: changes to its text are read out. Screen readers differ on reading a live region the moment it appears, so for a guaranteed announcement keep the EmptyState mounted and change its `title`.

## Usage

```svelte
<script>
  import { Button, EmptyState } from 'polymorph-ui-components';
</script>

<EmptyState title="Your cart is empty" description="Add something you like." announce>
  {#snippet icon()}
    <img src="/empty-cart.svg" alt="" />
  {/snippet}
  {#snippet actions()}
    <Button text="Continue shopping" />
  {/snippet}
</EmptyState>
```

## Props

| Prop        | Type      | Required | Default | Description                                                                                                                                                            |
| ----------- | --------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title       | `string`  | Yes      | `-`     | The main message, rendered as plain text.                                                                                                                              |
| description | `string`  | No       | `-`     | Supporting text under the title, rendered as plain text.                                                                                                               |
| announce    | `boolean` | No       | `false` | When true, the component is a `role="status"` live region, so changes to its text are announced.                                                                    |
| testId      | `string`  | No       | `-`     | Value for the `data-pw` attribute on the root element, used for end-to-end testing selectors.                                                                          |
| classes     | `string`  | No       | `-`     | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## Snippets

Svelte 5 Snippet props — pass content blocks to the component.

| Snippet | Type      | Description                                                                                  |
| ------- | --------- | -------------------------------------------------------------------------------------------- |
| icon    | `Snippet` | Optional illustration above the title. SVGs inside are sized by `--empty-state-icon-size`.   |
| actions | `Snippet` | Optional buttons or links under the text, laid out in a wrapping row.                        |

## CSS Variables

Override these custom properties to theme the component.

| Variable                                  | Default        | CSS Property    | Description                                                               |
| ----------------------------------------- | -------------- | --------------- | ------------------------------------------------------------------------- |
| `--empty-state-flex`                      | `1`            | flex            | Flex value of the root, so it fills a flex parent and centres its content. |
| `--empty-state-align-items`               | `center`       | align-items     | Horizontal alignment of the stacked content.                              |
| `--empty-state-justify-content`           | `center`       | justify-content | Vertical alignment of the stacked content.                                |
| `--empty-state-gap`                       | `16px`         | gap             | Space between the icon, title, description and actions.                   |
| `--empty-state-padding`                   | `32px 16px`    | padding         | Inner padding of the root.                                                |
| `--empty-state-text-align`                | `center`       | text-align      | Alignment of the title and description.                                   |
| `--empty-state-color`                     | `currentColor` | color           | Base text colour.                                                         |
| `--empty-state-font-family`               | `inherit`      | font-family     | Font family of the text.                                                  |
| `--empty-state-icon-size`                 | `48px`         | font-size, width, height | Size of the icon: its font size, and the width and height of SVGs inside. |
| `--empty-state-icon-color`                | `currentColor` | color           | Colour of the icon.                                                       |
| `--empty-state-title-font-size`           | `18px`         | font-size       | Font size of the title.                                                   |
| `--empty-state-title-font-weight`         | `600`          | font-weight     | Font weight of the title.                                                 |
| `--empty-state-title-line-height`         | `1.4`          | line-height     | Line height of the title.                                                 |
| `--empty-state-title-color`               | `currentColor` | color           | Colour of the title.                                                      |
| `--empty-state-description-font-size`     | `14px`         | font-size       | Font size of the description.                                             |
| `--empty-state-description-line-height`   | `1.5`          | line-height     | Line height of the description.                                           |
| `--empty-state-description-color`         | `currentColor` | color           | Colour of the description.                                                |
| `--empty-state-actions-justify-content`   | `center`       | justify-content | Alignment of the actions row.                                             |
| `--empty-state-actions-gap`               | `8px`          | gap             | Space between actions.                                                    |

## Accessibility

- With `announce`, the root is a `role="status"` region: changes to its text are read out politely. Whether it is read when it first appears depends on the screen reader.
- Title and description are plain text, never HTML.
- Give decorative icons an empty `alt` (or `aria-hidden="true"` on inline SVG) so only the title is read.

## Web Component

Tag: `<pui-empty-state>`

```html
<pui-empty-state title="No results" description="Try another search." announce>
  <svg slot="icon" viewBox="0 0 24 24" aria-hidden="true">…</svg>
  <button slot="actions">Clear filters</button>
</pui-empty-state>
```

### Slots

| Slot Name | Maps to Snippet | Description                     |
| --------- | --------------- | ------------------------------- |
| `icon`    | `icon`          | Illustration above the title.   |
| `actions` | `actions`       | Buttons or links under the text. |
