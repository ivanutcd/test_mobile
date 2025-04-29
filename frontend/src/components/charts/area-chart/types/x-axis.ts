export interface XAxisProps {
  scaleType:
    | 'time'
    | 'linear'
    | 'band'
    | 'point'
    | 'log'
    | 'pow'
    | 'sqrt'
    | 'utc';
  data: string[];
  id?: string;
  valueFormatter?: (params: any) => any;
}
