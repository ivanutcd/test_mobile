import { httpApi } from 'app/http/http-api';
import { useState } from 'react';
import { usePaginate } from '@common/hooks/use-paginate';
import { SearchProps } from '../features/consultar-formularios/props';
import { DateUtil } from '@common/dates/date-util';

export const useObtenerLogsFormulario = <T>(initialValues: any = {}) => {
  const [search, setSearch] = useState<SearchProps>(
    initialValues as SearchProps,
  );

  const [{ data, loading, error }, recargarOriginal] = usePaginate<T>(
    httpApi,
    `logs`,
    search,
  );


  const dataFormatted = data?.data.map((item: any) => {
    return {
      ...item,
      id: `${item.id}-${item.created}`,
      created: DateUtil.toFormat(item.created, 'dd/MM/yyyy hh:mm:ss a'),
    };
  });

  if (data) {
    data.data = dataFormatted as T[];
  }


  const recargar = () => {
    setSearch({});
    recargarOriginal({});
  };

  return {
    data,
    filtros: search,
    buscar: setSearch,
    recargar,
    loading,
    error,
  };
};

export default useObtenerLogsFormulario;