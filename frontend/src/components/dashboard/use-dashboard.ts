import { DashboardContextData } from '@components/dashboard/dashboard-context-data.tsx';
import { useContext, useMemo } from 'react';
import { DashboardContext } from '@components/dashboard/dashboard-context.tsx';

export const useDashboard = <T>(
  callback: (context: DashboardContextData) => T,
): T => {
  const context = useContext(DashboardContext);

  // Utiliza useMemo para memorizar el resultado de la callback
  return useMemo(() => callback(context), [callback, context]);
};
