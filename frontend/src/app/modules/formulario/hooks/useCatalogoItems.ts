
import { useGetWith } from '@common/hooks/use-get-with';
import { httpCatalogo } from 'app/http/http-catalogo';

export interface ValorCatalogo {
  nombre: string;
  id: string;
}

export const useCatalogoItems = (
  ...catalogos: string[]
): {
  data: Record<string, ValorCatalogo[]>;
  loading: boolean;
  error: any;
} => {
  const query = catalogos.map(c => `catalogos=${c}`).join('&');

  const [{ data, loading, error }] = useGetWith(httpCatalogo, {
    url: `/catalogos/items?${query}`,
  });

  return {
    data: (data ?? {}) as Record<string, ValorCatalogo[]>,
    loading,
    error,
  };
};
