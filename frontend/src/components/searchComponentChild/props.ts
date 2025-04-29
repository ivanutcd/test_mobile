export interface searchformProps<T> {
  open: boolean;
  save: (data: T) => void;
  close: () => void;
}
