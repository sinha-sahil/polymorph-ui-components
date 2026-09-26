import type { Snippet } from 'svelte';

export type SheetSide = 'left' | 'right' | 'top' | 'bottom';

export type SheetProperties = MandatorySheetProperties &
  OptionalSheetProperties &
  SheetEventProperties;

export type MandatorySheetProperties = {
  content: Snippet;
};

export type OptionalSheetProperties = {
  open?: boolean;
  side?: SheetSide;
  title?: string;
  showOverlay?: boolean;
  showCloseButton?: boolean;
  closeLabel?: string;
  testId?: string;
  footer?: Snippet;
  closeIcon?: Snippet;
  classes?: string;
};

export type SheetEventProperties = {
  onclose?: () => void;
};
