/// <reference types="react-scripts" />

// To solve the issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245
/// <reference types="styled-components/cssprop" />
declare interface Date {
  lessThanOrEqual(value: Date): boolean;
  lessThanOrEqualToNow(): boolean;
  greaterThanOrEqualToNow(): boolean;
  greaterThanNow(): boolean;
  lessThanOrEqualTo(value: Date): boolean;
  diffYears(fecha2: Date): number | undefined;
  diffMonths(fecha2: Date): number | undefined;
  diffDays(fecha2: Date): number | undefined;
  toFormat(format?: string): string;
  toDateOnlyString(): string;
  withHour(hour: string): Date;
  greaterThanYears(years?: number): boolean;
  greaterThan1970(): boolean;
}
