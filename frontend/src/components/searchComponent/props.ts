import { ActionToolbar } from '@components/toolbar-button/toolbar-button.tsx';

export interface SearchComponentProps<T> {
  ChildComponent: React.ElementType | null | undefined;
  save?: (value: T) => void;
  includeToolbar?: boolean;
  actions?: ActionToolbar[];
}
