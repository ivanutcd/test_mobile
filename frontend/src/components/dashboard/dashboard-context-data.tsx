import { ComponentData } from '@components/dashboard/models/component-data.tsx';

export interface DashboardContextData {
  filter: any;
  loading: boolean;
  components: ComponentData<any>[];
  search(filtro: any): Promise<void>;
}
