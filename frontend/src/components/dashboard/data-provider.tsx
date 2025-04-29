import { ComponentData } from './models/component-data.tsx';

export interface DataProvider<TData> {
  getData: (filter: any) => Promise<ComponentData<TData>[]>;
}
