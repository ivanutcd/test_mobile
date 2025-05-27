import { useEffect, useState, useCallback } from 'react';
import { httpApi } from 'app/http/http-api';
import { DateUtil } from '@common/dates/date-util';

export const usePaginadoFormulariosRelacionados = <T>(id?: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await httpApi.get<T[]>(`formulario/consultar-formularios-relacionado/${id}`);
      const formatted = response.map((item: any) => ({
        ...item,
        createdDate: DateUtil.toFormat(item.createdDate, 'dd/MM/yyyy hh:mm:ss a'),
        updatedDate: DateUtil.toFormat(item.updatedDate, 'dd/MM/yyyy hh:mm:ss a'),
      }));
      setData(formatted);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const recargar = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    recargar
  };
};

export default usePaginadoFormulariosRelacionados;