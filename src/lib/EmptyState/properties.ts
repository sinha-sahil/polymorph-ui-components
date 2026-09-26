import type { Snippet } from 'svelte';

export type EmptyStateProperties = MandatoryEmptyStateProperties & OptionalEmptyStateProperties;

export type MandatoryEmptyStateProperties = {
  title: string;
};

export type OptionalEmptyStateProperties = {
  description?: string;
  announce?: boolean;
  icon?: Snippet;
  actions?: Snippet;
  testId?: string;
  classes?: string;
};
