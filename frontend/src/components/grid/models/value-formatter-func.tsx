export interface ValueFormatterFunc {
  (params: { value: any; row: any }): string;
}
