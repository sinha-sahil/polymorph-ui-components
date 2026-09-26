import type { Snippet } from 'svelte';

export type ProgressMilestone = {
  value: number;
  label?: string;
};

export type ProgressProperties = MandatoryProgressProperties & OptionalProgressProperties;

export type MandatoryProgressProperties = {
  value: number;
};

export type OptionalProgressProperties = {
  max?: number;
  showLabel?: boolean;
  ariaLabel?: string;
  valueText?: string;
  milestones?: ProgressMilestone[];
  milestone?: Snippet<[ProgressMilestone, boolean]>;
  testId?: string;
  classes?: string;
};
