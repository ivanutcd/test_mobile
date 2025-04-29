import { useState } from 'react';
import { useGetWith } from '@common/hooks/use-get-with.ts';
import { httpCatalogo } from 'app/http/http-catalogo.ts';
import { CatalogoItem } from './catalogo-item.model';
import { UseAxiosResult } from 'axios-hooks';

const initIfEmpty = <K>(types: string[]): K => {
  const newData = {} as any;
  types.forEach(x => {
    newData[x] = [];
  });
  return newData;
};

export const useCatalogos = <
  T extends string,
  K extends {
    [key in T]: CatalogoItem[];
  },
>(
  ...types: T[]
): { data: K; loading: boolean; error: any } => {
  const [state] = useState<any>({});
  const queryString = types.map(x => `catalogos=${x}`).join('&');
  const [{ data, loading, error }] = useGetWith(httpCatalogo, {
    url: `/catalogos/items?${queryString}`,
    params: state,
  });

  const currentData =
    !data || Object.keys(data).length === 0
      ? initIfEmpty<K>(types)
      : (data as K);

  return { data: currentData, loading, error };
};

export const useCatalogosTypes: () => UseAxiosResult<any[]> = () => {
  return useGetWith<any[]>(httpCatalogo, {
    url: `/catalogos/no-paginados`,
  });
};
