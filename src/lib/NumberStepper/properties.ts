import type { Snippet } from 'svelte';

export type NumberStepperProperties = MandatoryNumberStepperProperties &
  OptionalNumberStepperProperties &
  NumberStepperEventProperties;

export type MandatoryNumberStepperProperties = {
  value: number;
};

export type OptionalNumberStepperProperties = {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  ariaLabel?: string;
  decrementLabel?: string;
  incrementLabel?: string;
  loadingLabel?: string;
  decrementIcon?: Snippet<[number]>;
  incrementIcon?: Snippet<[number]>;
  testId?: string;
  classes?: string;
};

export type NumberStepperEventProperties = {
  onchange?: ((value: number) => void) | ((value: number) => Promise<void>);
};
