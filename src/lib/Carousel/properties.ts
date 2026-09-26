import type { Component, Snippet } from 'svelte';

export type CarouselView = {
  properties?: Record<string, unknown>;
  component: Component<Record<string, unknown>>;
};

export type CarouselProperties = CarouselEventProperties & OptionalCarouselProperties;

/** @deprecated `views` is optional now that slides can also come from the `slide` snippet. */
export type MandatoryCarouselProperties = {
  views: CarouselView[];
};

export type OptionalCarouselProperties = {
  views?: CarouselView[];
  count?: number;
  slide?: Snippet<[number]>;
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  isScrollableLast?: boolean;
  loop?: boolean;
  announce?: boolean;
  ariaLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  previousIcon?: Snippet;
  nextIcon?: Snippet;
  testId?: string;
  classes?: string;
};

export type CarouselEventProperties = {
  onkeydown?: (event: KeyboardEvent) => void;
};
