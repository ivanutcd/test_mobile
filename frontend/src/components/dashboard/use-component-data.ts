import { useMemo } from 'react';
import { ComponentData } from '@components/dashboard/models/component-data.tsx';
import { useDashboard } from '@components/dashboard/use-dashboard.ts';

export const useComponentData = <T>(tipo: string): ComponentData<T> => {
  const components = useDashboard(x => x.components);
  const filteredComponent = useMemo(
    () => components.find(x => x.id === tipo),
    [components, tipo],
  );

  return (filteredComponent ?? {}) as ComponentData<T>;
};
