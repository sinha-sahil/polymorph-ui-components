export type ConfettiOrigin = 'top' | 'center' | 'bottom' | 'sides';

export type ConfettiProperties = OptionalConfettiProperties & ConfettiEventProperties;

export type OptionalConfettiProperties = {
  pieces?: number;
  origin?: ConfettiOrigin;
  testId?: string;
  classes?: string;
};

export type ConfettiEventProperties = {
  onconfettiend?: () => void;
};
