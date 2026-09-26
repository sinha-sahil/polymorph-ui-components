export type CountdownProperties = MandatoryCountdownProperties &
  OptionalCountdownProperties &
  CountdownEventProperties;

export type MandatoryCountdownProperties = {
  duration: number;
};

export type OptionalCountdownProperties = {
  ariaLabel?: string;
  testId?: string;
  classes?: string;
};

export type CountdownEventProperties = {
  oncountdownend?: () => void;
};
