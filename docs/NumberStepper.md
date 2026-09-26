# NumberStepper

A compact − value + control for stepping a number, such as a cart line quantity. `onchange` receives the requested value; the component never changes `value` itself, so the parent stays the source of truth (a server can refuse or cap the change). If `onchange` returns a Promise, a loader replaces the value and further presses are ignored until it settles; the buttons stay focusable, so keyboard focus is never lost. Icon snippets receive the current value, so the decrement icon can become a trash can when the next step removes the item.

## Usage

```svelte
<script>
  import { NumberStepper } from 'polymorph-ui-components';

  let quantity = $state(1);
</script>

<NumberStepper value={quantity} min={0} max={10} onchange={(next) => (quantity = next)} />

<NumberStepper
  value={line.quantity}
  ariaLabel="Quantity"
  decrementLabel={line.quantity === 1 ? 'Remove item' : 'Decrease quantity'}
  incrementLabel="Increase quantity"
  loadingLabel="Updating quantity"
  onchange={(next) => updateLine(line.id, next)}
>
  {#snippet decrementIcon(value)}
    {#if value === 1}<TrashIcon />{:else}<MinusIcon />{/if}
  {/snippet}
</NumberStepper>
```

## Props

| Prop           | Type      | Required | Default      | Description                                                                                                        |
| -------------- | --------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| value          | `number`  | Yes      | `-`          | The current value. Read only: update it from `onchange`.                                                           |
| min            | `number`  | No       | `0`          | Lowest value. Decrement is disabled when `value - step` would fall below it.                                       |
| max            | `number`  | No       | `Infinity`   | Highest value. Increment is disabled when `value + step` would exceed it.                                          |
| step           | `number`  | No       | `1`          | Amount added or removed per press.                                                                                 |
| disabled       | `boolean` | No       | `false`      | Disables both buttons.                                                                                             |
| ariaLabel      | `string`  | No       | `'Quantity'` | Accessible name of the control group.                                                                              |
| decrementLabel | `string`  | No       | `'Decrease'` | Accessible name of the decrement button, e.g. `Remove item` when the next step removes it.                         |
| incrementLabel | `string`  | No       | `'Increase'` | Accessible name of the increment button.                                                                           |
| loadingLabel   | `string`  | No       | `'Updating'` | Text announced while a Promise returned by `onchange` is pending.                                                  |
| testId         | `string`  | No       | `-`          | Value for `data-pw` on the root. The buttons get `{testId}-decrement` and `{testId}-increment`.                     |
| classes        | `string`  | No       | `-`          | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## Snippets

Svelte 5 Snippet props — pass content blocks to the component.

| Snippet       | Type                | Description                                                                              |
| ------------- | ------------------- | ---------------------------------------------------------------------------------------- |
| decrementIcon | `Snippet<[number]>` | Icon inside the decrement button. Receives the current value. Defaults to a minus icon.  |
| incrementIcon | `Snippet<[number]>` | Icon inside the increment button. Receives the current value. Defaults to a plus icon.   |

## Events

| Event    | Type                                        | Description                                                                                                                         |
| -------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| onchange | `((value: number) => void) \| ((value: number) => Promise<void>)` | Fires with `value ± step` when a button is pressed. Return a Promise to show the loader and ignore further presses until it settles. Handle errors inside it: a rejected Promise ends the pending state and is passed on. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                                   | Default             | CSS Property      | Description                                              |
| ------------------------------------------ | ------------------- | ----------------- | -------------------------------------------------------- |
| `--number-stepper-gap`                     | `0`                 | gap               | Space between the buttons and the value.                 |
| `--number-stepper-padding`                 | `0`                 | padding           | Inner padding of the control.                            |
| `--number-stepper-border`                  | `1px solid currentColor` | border       | Border around the control.                               |
| `--number-stepper-border-radius`           | `6px`               | border-radius     | Corner rounding of the control.                          |
| `--number-stepper-background`              | `transparent`       | background        | Background of the control.                               |
| `--number-stepper-color`                   | `currentColor`      | color             | Text and icon colour.                                    |
| `--number-stepper-button-background`       | `transparent`       | background        | Background of the buttons.                               |
| `--number-stepper-button-color`            | `currentColor`      | color             | Icon colour of the buttons.                              |
| `--number-stepper-button-hover-background` | `transparent`       | background        | Background of a hovered button.                          |
| `--number-stepper-button-padding`          | `6px`               | padding           | Padding inside each button.                              |
| `--number-stepper-button-border-radius`    | `6px`               | border-radius     | Corner rounding of each button.                          |
| `--number-stepper-button-disabled-opacity` | `0.4`               | opacity           | Opacity of a disabled button, and of both buttons while a change is pending. |
| `--number-stepper-icon-size`               | `14px`              | width, height     | Size of the button icons.                                |
| `--number-stepper-value-min-width`         | `24px`              | min-width         | Minimum width of the value, so the control doesn't jump. |
| `--number-stepper-value-font-size`         | `14px`              | font-size         | Font size of the value.                                  |
| `--number-stepper-value-font-weight`       | `500`               | font-weight       | Font weight of the value.                                |
| `--number-stepper-value-font-variant-numeric` | `tabular-nums`   | font-variant-numeric | Digit style of the value; tabular digits keep its width steady. |
| `--number-stepper-loader-size`             | `14px`              | width, height     | Size of the loader shown while a change is pending.      |
| `--number-stepper-pending-cursor`          | `progress`          | cursor            | Cursor over the buttons while a change is pending.       |

## Accessibility

- The control is a `role="group"` named by `ariaLabel`, and each button has its own name, so a screen reader hears "Quantity, group", "Decrease quantity, button", "Increase quantity, button".
- The value is an `aria-live="polite"` region: the new value is read after each change, and `loadingLabel` while a change is pending.
- `aria-busy` is set on the group while a change is pending, and presses are ignored so a second press can't race the first. The buttons stay enabled and focusable (dimmed by `--number-stepper-button-disabled-opacity`), so focus stays where it was.
- At `min` or `max` the matching button is disabled; if it had focus, focus moves to the other button.

## Internal Dependencies

This component uses the following library components internally:

- Button (for the decrement and increment buttons)
- Loader (while a change is pending)

## Web Component

Tag: `<pui-number-stepper>`

```html
<pui-number-stepper value="2" min="0" max="10" aria-label="Quantity"></pui-number-stepper>
```

> **Note:** Set `onchange` via JavaScript property and write the new value back to `value`. The icon snippets are Svelte only; custom elements use the built-in icons.
