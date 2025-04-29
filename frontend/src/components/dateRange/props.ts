export interface searchDatesformProps<T> {
  open: boolean;
  save: (data: T) => void;
  close: () => void;
}
