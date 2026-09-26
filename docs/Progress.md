# Progress

A linear progress bar showing task completion or usage. The `value` prop controls the filled portion relative to `max`. When `showLabel` is true, a percentage text is displayed next to the bar. Setting `value` to a negative number activates an indeterminate sliding animation for unknown-duration tasks. `milestones` places markers along the track, each at its own value, with optional labels underneath — useful for reward tiers, free-shipping thresholds or checkpoints. A milestone counts as reached once `value` meets it; render your own marker per milestone with the `milestone` snippet.

## Usage

```svelte
<script>
  import { Progress } from 'polymorph-ui-components';
</script>

<Progress value={60} ariaLabel="Upload" />

<Progress
  value={2}
  max={3}
  ariaLabel="Rewards"
  valueText="2 of 3 rewards unlocked"
  milestones={[
    { value: 1, label: 'Free shipping' },
    { value: 2, label: '10% off' },
    { value: 3, label: 'Free gift' }
  ]}
>
  {#snippet milestone(stop, reached)}
    <span class={reached ? 'tier tier-reached' : 'tier'}>{stop.value}</span>
  {/snippet}
</Progress>
```

## Props

| Prop      | Type      | Required | Default | Description                                                                                                                                                            |
| --------- | --------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | `number`  | Yes      | `-`     | Current progress value (0 to max). Values are clamped to the 0-max range. A negative value activates the indeterminate animation for unknown-duration tasks.           |
| max       | `number`  | No       | `100`   | The maximum value representing 100% completion. The filled percentage is calculated as (value / max) \* 100.                                                           |
| showLabel | `boolean` | No       | `false` | Whether to display the rounded percentage text next to the progress bar. Hidden during indeterminate mode.                                                             |
| ariaLabel | `string`  | No       | `'Progress'` | Accessible name of the progress bar.                                                                                                                              |
| valueText | `string`  | No       | `-`     | Human-readable value announced instead of the number, e.g. `2 of 3 rewards unlocked`. Maps to `aria-valuetext`.                                                        |
| milestones | `ProgressMilestone[]` | No | `[]`   | Markers placed along the track at their `value` (clamped to 0–max, sorted). Each marker ends at its value, so one at `max` sits inside the track. Labels, when any milestone has one, render underneath, ending at the same point. |
| testId    | `string`  | No       | `-`     | Value for the data-pw attribute, used for end-to-end testing selectors.                                                                                                |
| classes   | `string`  | No       | `-`     | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## Snippets

Svelte 5 Snippet props — pass content blocks to the component.

| Snippet   | Type                                    | Description                                                                                                                          |
| --------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| milestone | `Snippet<[ProgressMilestone, boolean]>` | Renders one milestone marker. Receives the milestone and whether `value` has reached it. Falls back to a round marker when omitted. |

## CSS Variables

Override these custom properties to theme the component.

| Variable                            | Default           | CSS Property       | Description                                                   |
| ----------------------------------- | ----------------- | ------------------ | ------------------------------------------------------------- |
| `--progress-container-width`        | `100%`            | width              | Width of the outer container holding the track and label.     |
| `--progress-container-padding`      | `0`               | padding            | Padding around the progress container.                        |
| `--progress-container-gap`          | `8px`             | gap                | Gap between the track and the percentage label.               |
| `--progress-track-height`           | `8px`             | height             | Height of the background track.                               |
| `--progress-track-background`       | `#e4e4e7`         | background         | Background color of the unfilled track.                       |
| `--progress-track-border-radius`    | `4px`             | border-radius      | Corner rounding of the track.                                 |
| `--progress-bar-background`         | `currentColor`    | background         | Background color of the filled bar.                           |
| `--progress-bar-border-radius`      | `4px`             | border-radius      | Corner rounding of the filled bar.                            |
| `--progress-bar-transition`         | `width 0.3s ease` | transition         | Transition applied when the bar width changes.                |
| `--progress-indeterminate-duration` | `1.5s`            | animation-duration | Duration of one cycle of the indeterminate sliding animation. |
| `--progress-label-font-size`        | `14px`            | font-size          | Font size of the percentage label.                            |
| `--progress-label-font-weight`      | `500`             | font-weight        | Font weight of the percentage label.                          |
| `--progress-label-color`            | `currentColor`    | color              | Text color of the percentage label.                           |
| `--progress-label-font-family`      | `inherit`         | font-family        | Font family of the percentage label.                          |
| `--progress-label-margin`           | `0`               | margin             | Margin around the percentage label.                           |
| `--progress-milestone-size`         | `12px`            | width, height      | Size of the built-in milestone marker.                        |
| `--progress-milestone-border`       | `2px solid #ffffff` | border           | Border of the built-in marker, separating it from the track.  |
| `--progress-milestone-border-radius` | `50%`            | border-radius      | Corner rounding of the built-in marker.                       |
| `--progress-milestone-background`   | `#e4e4e7`         | background         | Built-in marker colour before it is reached.                  |
| `--progress-milestone-reached-background` | `currentColor` | background     | Built-in marker colour once reached.                          |
| `--progress-milestone-label-gap`    | `8px`             | gap                | Space between the track and the milestone labels.             |
| `--progress-milestone-label-font-size` | `12px`         | font-size          | Font size of the milestone labels.                            |
| `--progress-milestone-label-font-weight` | `400`        | font-weight        | Font weight of the milestone labels.                          |
| `--progress-milestone-label-color`  | `currentColor`    | color              | Text colour of the milestone labels.                          |
| `--progress-milestone-label-font-family` | `inherit`    | font-family        | Font family of the milestone labels.                          |
| `--progress-milestone-label-text-align` | `end`         | text-align         | Alignment of a label within its segment; `end` lines it up with its marker. |

## Accessibility

- The track has `role="progressbar"` with `aria-valuemin`, `aria-valuemax` and `aria-valuenow` (omitted while indeterminate), named by `ariaLabel`.
- `valueText` becomes `aria-valuetext`, so screen readers can hear "2 of 3 rewards unlocked" instead of a bare number.
- Milestone labels sit outside the progress bar, so they stay readable as text.

## Type Reference

### ProgressMilestone

```typescript
type ProgressMilestone = {
  value: number;
  label?: string;
};
```

## Web Component

Tag: `<pui-progress>`

```html
<pui-progress value="60" max="100" show-label aria-label="Upload"></pui-progress>
```

> **Note:** Set `milestones` via JavaScript property. The `milestone` snippet is Svelte only; custom elements use the built-in marker.
