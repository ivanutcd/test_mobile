import { httpApi } from 'app/http/http-api';
import { useState } from 'react';
import { usePaginate } from '@common/hooks/use-paginate';
import { SearchProps } from '../features/consultar-formularios/props';
import { DateUtil } from '@common/dates/date-util';

export const usePaginadoFormularios = <T>(initialValues: any = {}) => {
  const [search, setSearch] = useState<SearchProps>(
    initialValues as SearchProps,
  );

  const [{ data, loading, error }, recargarOriginal] = usePaginate<T>(
    httpApi,
    `formulario`,
    search,
  );


  const dataFormatted = data?.data.map((item: any) => {
    return {
      ...item,
      createdDate: DateUtil.toFormat(item.createdDate, 'dd/MM/yyyy hh:mm:ss a'),
      updatedDate: DateUtil.toFormat(item.updatedDate, 'dd/MM/yyyy hh:mm:ss a'),
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

export default usePaginadoFormularios;
