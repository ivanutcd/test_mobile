import { useGetWith } from '@common/hooks/use-get-with';
import { httpCatalogo } from 'app/http/http-catalogo';
import { CatalogoItem } from '@common/catalog/catalogo-item.model';

type CatalogoMap = Record<string, CatalogoItem[]>;

export const useCatalogosTodos = (): {
  data: CatalogoMap;
  loading: boolean;
  error: any;
} => {
  interface CatalogosResponse {
    data: CatalogoItem[];
    [key: string]: any;
  }

  const [{ data, loading, error }] = useGetWith<CatalogosResponse>(httpCatalogo, {
    url: `/catalogos`,
    params: {
      pageSize: 1000,
      page: 1,
    },
  });

  const agrupado: CatalogoMap = {};

  if (Array.isArray(data?.data)) {
    data.data.forEach((item: CatalogoItem) => {
      if (!agrupado[item.id]) agrupado[item.id] = [];
      agrupado[item.id].push(item);
    });
  }

  return {
    data: agrupado,
    loading,
    error,
  };
};
