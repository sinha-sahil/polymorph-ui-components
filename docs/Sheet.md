# Sheet

A panel component that slides in from any edge of the screen (left, right, top, or bottom). Designed for navigation menus, settings panels, detail views, or notification trays. Left/right sheets span the full viewport height; top/bottom sheets span the full viewport width. Includes a structured layout with a header (title and close button), scrollable content area, and an optional footer. The `open` prop is bindable for two-way state control. The panel slides in by its own full width (or height), so wide sheets never pop in part-way. Page scroll is locked while the sheet is open, focus is trapped within the panel and returns to the element that had it when the sheet closes. Motion is skipped for users who prefer reduced motion.

## Usage

```svelte
<script>
  import { Sheet } from 'polymorph-ui-components';

  let sheetOpen = $state(false);
</script>

<button onclick={() => (sheetOpen = true)}>Open Sheet</button>

<Sheet bind:open={sheetOpen} title="Settings" side="right" onclose={() => console.log('closed')}>
  {#snippet content()}
    <p>Sheet content goes here</p>
  {/snippet}
  {#snippet footer()}
    <button onclick={() => (sheetOpen = false)}>Done</button>
  {/snippet}
</Sheet>
```

## Props

| Prop            | Type        | Required | Default   | Description                                                                                                                                                                                                                      |
| --------------- | ----------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content         | `Snippet`   | Yes      | -         | Snippet rendered inside the scrollable content area of the sheet panel. This is the main body of the sheet.                                                                                                                      |
| open            | `boolean`   | No       | `false`   | Bindable. Controls whether the sheet is visible. When true, the sheet panel slides in from the configured side and the overlay is shown. Supports two-way binding via `bind:open`.                                               |
| side            | `SheetSide` | No       | `'right'` | The edge of the screen from which the sheet slides in. `'left'` and `'right'` panels span the full viewport height with configurable width. `'top'` and `'bottom'` panels span the full viewport width with configurable height. |
| title           | `string`    | No       | `-`       | Text displayed in the sheet header. When provided, a header bar is rendered at the top of the panel with this title.                                                                                                             |
| showOverlay     | `boolean`   | No       | `true`    | When true, shows a dark semi-transparent overlay behind the sheet panel. When false, the overlay is transparent with pointer-events disabled on the backdrop.                                                                    |
| showCloseButton | `boolean`   | No       | `true`    | When true, renders a close button (X) in the sheet header. Clicking it closes the sheet and fires the onclose event.                                                                                                             |
| closeLabel      | `string`    | No       | `'Close'` | Accessible name of the close button, e.g. `Close cart`.                                                                                                                                                                          |
| testId          | `string`    | No       | `-`       | Value for data-pw on the overlay container element. The close button gets `{testId}-close` as its data-pw value. Used for Playwright test selectors.                                                                             |
| classes         | `string`    | No       | `-`       | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles.                                                           |

## Snippets

Svelte 5 Snippet props — pass content blocks to the component.

| Snippet | Type      | Description                                                                                                                                                                   |
| ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content | `Snippet` | Required. The main body content rendered inside the scrollable area of the sheet panel.                                                                                       |
| footer  | `Snippet` | Optional. Content rendered in a fixed footer area at the bottom of the sheet panel, separated from the content by a border. Useful for action buttons or summary information. |
| closeIcon | `Snippet` | Optional. Replaces the built-in close icon inside the close button. Sized by `--sheet-close-icon-size`.                                                                   |

## Events

| Event   | Type         | Description                                                                                                                                                                                            |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| onclose | `() => void` | Fires when the sheet is dismissed by clicking the overlay backdrop, pressing the Escape key, or clicking the close button. The `open` prop is automatically set to `false` before this callback fires. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                                | Default                          | CSS Property     | Description                                                                                                                                                                          |
| --------------------------------------- | -------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--sheet-overlay-z-index`               | `15`                             | z-index          | Z-index stacking order of the overlay backdrop.                                                                                                                                      |
| `--sheet-overlay-background`            | `#00000066`                      | background-color | Background color of the semi-transparent overlay behind the sheet.                                                                                                                   |
| `--sheet-width`                         | `400px`                          | width            | Width of the sheet panel (applies to left/right sides only).                                                                                                                         |
| `--sheet-max-width`                     | `100vw`                          | max-width        | Maximum width of the sheet panel (left/right sides), prevents it from exceeding viewport width on small screens.                                                                     |
| `--sheet-height`                        | `300px`                          | height           | Height of the sheet panel (applies to top/bottom sides only).                                                                                                                        |
| `--sheet-max-height`                    | `100vh`                          | max-height       | Maximum height of the sheet panel (top/bottom sides), prevents it from exceeding viewport height.                                                                                    |
| `--sheet-background`                    | `#ffffff`                        | background-color | Background color of the sheet panel.                                                                                                                                                 |
| `--sheet-box-shadow`                    | `-2px 0 8px rgba(0, 0, 0, 0.15)` | box-shadow       | Shadow cast by the sheet panel.                                                                                                                                                      |
| `--sheet-z-index`                       | `16`                             | z-index          | Z-index stacking order of the sheet panel itself.                                                                                                                                    |
| `--sheet-border`                        | `none`                           | border           | Border on the edge of the sheet panel facing the page content. Applied as border-left (right side), border-right (left side), border-bottom (top side), or border-top (bottom side). |
| `--sheet-header-padding`                | `16px 20px`                      | padding          | Inner padding of the header area.                                                                                                                                                    |
| `--sheet-header-gap`                    | `8px`                            | gap              | Space between the title and the close button.                                                                                                                                        |
| `--sheet-header-background`             | `inherit`                        | background-color | Background color of the header area.                                                                                                                                                 |
| `--sheet-header-border-bottom`          | `1px solid #e4e4e7`              | border-bottom    | Bottom border of the header, visually separating it from the content area.                                                                                                           |
| `--sheet-title-font-size`               | `18px`                           | font-size        | Font size of the title text in the header.                                                                                                                                           |
| `--sheet-title-font-weight`             | `600`                            | font-weight      | Font weight of the title text in the header.                                                                                                                                         |
| `--sheet-title-font-family`             | `inherit`                        | font-family      | Font family of the title text in the header.                                                                                                                                         |
| `--sheet-title-color`                   | `currentColor`                   | color            | Text color of the title in the header.                                                                                                                                               |
| `--sheet-title-line-height`             | `1.4`                            | line-height      | Line height of the title text in the header.                                                                                                                                         |
| `--sheet-close-button-size`             | `32px`                           | width, height    | Width and height of the close button in the header.                                                                                                                                  |
| `--sheet-close-button-border-radius`    | `6px`                            | border-radius    | Border radius of the close button.                                                                                                                                                   |
| `--sheet-close-button-background`       | `transparent`                    | background-color | Background color of the close button in its default state.                                                                                                                           |
| `--sheet-close-button-color`            | `currentColor`                   | color            | Color of the close button icon.                                                                                                                                                      |
| `--sheet-close-button-font-size`        | `16px`                           | font-size        | Font size inside the close button, for icons sized in `em`.                                                                                                                          |
| `--sheet-close-icon-size`               | `var(--sheet-close-button-font-size, 16px)` | width, height | Width and height of the close icon SVG, built-in or from `closeIcon`. Follows `--sheet-close-button-font-size` when not set.                                                     |
| `--sheet-close-button-hover-background` | `transparent`                    | background-color | Background color of the close button when hovered.                                                                                                                                   |
| `--sheet-content-overflow-y`            | `auto`                           | overflow-y       | Vertical overflow behavior of the scrollable content area.                                                                                                                           |
| `--sheet-content-padding`               | `20px`                           | padding          | Inner padding of the content area.                                                                                                                                                   |
| `--sheet-scrollbar-width`               | `none`                           | scrollbar-width  | Controls the visibility of the scrollbar in the content area. Set to `auto` or `thin` to show scrollbar.                                                                             |
| `--sheet-footer-padding`                | `16px 20px`                      | padding          | Inner padding of the footer area.                                                                                                                                                    |
| `--sheet-footer-background`             | `inherit`                        | background-color | Background color of the footer area.                                                                                                                                                 |
| `--sheet-footer-border-top`             | `1px solid #e4e4e7`              | border-top       | Top border of the footer, visually separating it from the content area.                                                                                                              |

## Accessibility

- The sheet panel has `role="dialog"` and `aria-modal="true"` for screen reader support; the title is an `h2` (it was a `span`; page-wide `h2` rules other than margin, font and colour now reach it).
- The overlay is `role="presentation"`, so the dialog is never announced as part of a button.
- Focus is automatically moved to the sheet panel when it opens (also when it is reopened while closing), and returns to the previously focused element when it closes.
- Focus is trapped within the sheet panel using Tab/Shift+Tab cycling. The trap walks the composed tree, so content passed through slots (`<pui-sheet>`) and open shadow roots take part, and inert or hidden elements are skipped. It works when the sheet itself lives in a shadow root.
- Escape and Tab still work if focus has fallen out of the panel, for example after the focused element was removed: Escape closes and Tab brings focus back in.
- Pressing the Escape key closes the sheet.
- The close button is named by `closeLabel` (default `Close`).
- With `prefers-reduced-motion: reduce` the sheet opens and closes without sliding or fading.
- The page scroll lock is shared with Modal, CommandMenu and Gallery: nested overlays keep the page locked until the last one closes, and the page's own inline `overflow` is restored afterwards.

## Type Reference

Custom types used by this component's props and events:

### SheetSide

```typescript
type SheetSide = 'left' | 'right' | 'top' | 'bottom';
```

## Internal Dependencies

This component uses the following library components internally:

- Button (for the close button)

## Web Component

Tag: `<pui-sheet>`

```html
<pui-sheet open side="right" title="Settings" close-label="Close settings">
  <p>Sheet body content</p>
  <div slot="footer">
    <button>Save</button>
  </div>
</pui-sheet>
```

### Slots

| Slot Name   | Maps to Snippet | Description                           |
| ----------- | --------------- | ------------------------------------- |
| _(default)_ | `content`       | The main body content of the sheet.   |
| `footer`    | `footer`        | Content rendered in the sheet footer. |
