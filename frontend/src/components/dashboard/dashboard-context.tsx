import React from 'react';
import { DashboardContextData } from '@components/dashboard/dashboard-context-data.tsx';

export const DashboardContext = React.createContext<DashboardContextData>({
  filter: undefined,
  loading: false,
  components: [],
  search: async () => {},
});
