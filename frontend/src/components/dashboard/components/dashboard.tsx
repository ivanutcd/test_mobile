import { DataProvider } from '../data-provider.tsx';
import { useState } from 'react';
import { DashboardContext } from '../dashboard-context.tsx';
import { ComponentData } from '../models/component-data.tsx';
import { DashboardContextData } from '@components/dashboard/dashboard-context-data.tsx';

interface Props<TData> {
  children: any;
  dataProviders: DataProvider<TData>[];
}

export const Dashboard = <TData,>({
  children,
  dataProviders,
}: Props<TData>) => {
  const [components, setComponents] = useState([] as ComponentData<any>[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>();

  const search = async (filter: any) => {
    setLoading(true);
    setFilter(filter);
    try {
      const componentsData = await Promise.all(
        dataProviders.map(x => x.getData(filter)),
      );
      setComponents(componentsData.flatMap(x => x));
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const contexto: DashboardContextData = {
    search,
    filter,
    components: components,
    loading: loading,
  };

  return (
    <>
      <DashboardContext.Provider value={contexto}>
        {children}
      </DashboardContext.Provider>
    </>
  );
};
