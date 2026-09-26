# Countdown

A bar that drains over `duration` milliseconds, then fires `oncountdownend`. Use it wherever time runs out: a modal or toast that closes itself, a resend-code timer, a hold on an offer. It plays once per mount, so wrap it in `{#key}` to restart it. With `ariaLabel` it is a named `role="timer"`; without one it is decorative and hidden from assistive tech. Under reduced motion the bar steps down once a second instead of sliding.

## Usage

```svelte
<script>
  import { Countdown, Modal } from 'polymorph-ui-components';

  let open = $state(true);
</script>

{#if open}
  <Modal ariaLabel="Saved" onoverlayclick={() => (open = false)}>
    {#snippet content()}
      <p>Your changes are saved.</p>
      <Countdown duration={4000} oncountdownend={() => (open = false)} />
    {/snippet}
  </Modal>
{/if}
```

## Props

| Prop      | Type     | Required | Default | Description                                                                                                                                                            |
| --------- | -------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| duration  | `number` | Yes      | -       | Milliseconds the bar takes to drain.                                                                                                                                   |
| ariaLabel | `string` | No       | -       | Names the countdown and makes it a `role="timer"`, such as `Closes in 4 seconds`. Without it the bar is decorative (`aria-hidden`).                                   |
| testId    | `string` | No       | -       | Value for the data-pw attribute on the root element, used for end-to-end testing selectors.                                                                            |
| classes   | `string` | No       | -       | CSS class string applied to the component's top-level element. Useful for theming — define classes with CSS variable overrides and pass them to create variant styles. |

## Events

| Event          | Type         | Description                            |
| -------------- | ------------ | -------------------------------------- |
| oncountdownend | `() => void` | Fires when the bar has fully drained.  |

## CSS Variables

Override these custom properties to theme the component.

| Variable                    | Default   | CSS Property     | Description                                                       |
| --------------------------- | --------- | ---------------- | ----------------------------------------------------------------- |
| `--countdown-width`         | `100%`    | width            | Width of the bar.                                                 |
| `--countdown-height`        | `4px`     | height           | Height of the bar.                                                |
| `--countdown-border-radius` | `0`       | border-radius    | Corner rounding of the bar.                                       |
| `--countdown-track-color`   | `#e4e4e7` | background-color | Colour behind the draining bar.                                   |
| `--countdown-color`         | `#18181b` | background-color | Colour of the time left.                                          |
| `--countdown-origin`        | `left`    | transform-origin | The side the bar drains toward; `right` for right-to-left pages.  |

## Web Component

Tag: `<pui-countdown>`

```html
<pui-countdown duration="4000" aria-label="Closes in 4 seconds"></pui-countdown>
```
