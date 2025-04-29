import { HttpAxios } from '@common/http';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { RefetchOptions } from 'axios-hooks';
import { useEffect, useState } from 'react';
import { useGetWith } from '@common/hooks/use-get-with.ts';
import { PaginateResult } from '@common/hooks/models/paginate-result.ts';
import { ExtendsResponseValues } from '@common/hooks/models/extends-response-values.ts';

interface Paginated<T> {
  currentPage: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  data: Array<T>;
}
interface Config {
  pageIn: number;
  sizeIn: number;
  sizeOptions: Array<number>;
  onLoad?: boolean;
}

const defaultSizeOptions = [10, 20, 30];

/*
 * `usePaginate` es un hook personalizado de React para manejar la paginación en una aplicación.
 * Utiliza el hook `useGetWith` para obtener datos paginados de una URL dada.
 *
 * @template T El tipo de datos que se está paginando.
 *
 * @param {HttpAxios} instance La instancia de HttpAxios a utilizar para la solicitud.
 * @param {string} url La URL de donde obtener los datos.
 * @param {any} [params={}] Parámetros adicionales para incluir en la solicitud en formato queryString puedes incluir fechas, listas etc, si un campo es null o undefined lo omite.
 * @param {Config} [config] Opciones de configuración para la paginación.
 *
 * @returns {Array} Un array que contiene:
 * - Un objeto con los datos paginados e información adicional (estado de carga, estado de error, etc.).
 * - Una función para ejecutar la solicitud nuevamente con nueva configuración y opciones opcionales.
 * - Una función para restablecer el estado del hook.
 * */
export const usePaginate = <T>(
  instance: HttpAxios,
  url: string,
  params: any = {},
  config?: Config,
): [
  ExtendsResponseValues<PaginateResult<T>, any, any>,
  (
    config?: AxiosRequestConfig,
    options?: RefetchOptions,
  ) => AxiosPromise<Paginated<T>>,
  () => void,
] => {
  const onLoad = config?.onLoad === undefined ? true : config.onLoad;
  const [page, setPage] = useState(config?.pageIn || 1);
  const [pageSize, setPageSize] = useState(
    config?.sizeIn || defaultSizeOptions[0],
  );
  const [pageSizeOptions] = useState(config?.sizeOptions || [10, 20, 30]);
  const [myParams, setMyParams] = useState(params);
  const [firstLoading, setFirsLoading] = useState<boolean>(onLoad);

  const resultHook = useGetWith<Paginated<T>>(
    instance,
    {
      url,
      params: { pageSize, page: page, ...myParams },
    },
    { onLoad: onLoad },
  );
  const [result, execute, other] = resultHook;
  const isLoading = result.loading;

  useEffect(() => {
    if (!isLoading && firstLoading) {
      setFirsLoading(false);
    }
  }, [isLoading, firstLoading]);

  useEffect(() => {
    setMyParams(params);
    setPage(1);
  }, [params, setMyParams, setPage]);

  const paginated = result.data;
  console.log(paginated,"paginated")
  const newData: PaginateResult<T> = paginated
    ? {
      data: paginated.data,
      total: paginated.rowCount,
      currentPage: paginated.currentPage,
      pageSize: paginated.pageSize,
      lastPage: paginated.pageCount,
      pageSizeOptions: pageSizeOptions,
      changePage: (value: number) => {
        setPage(value);
      },
      changeSizePage: (value: number) => {
        setPage(1);
        setPageSize(value);
      },
    }
    : {
      data: [],
      total: 0,
      currentPage: 1,
      pageSize: pageSize,
      lastPage: 1,
      pageSizeOptions: pageSizeOptions,
      changePage: (value: number) => {
        console.log(value);
      },
      changeSizePage: (value: number) => {
        console.log(value);
      },
    };

  const newResponse = result.response
    ? {
      ...result.response,
      data: newData as any,
    }
    : ({
      data: undefined,
      total: 0,
      currentPage: 0,
      pageSize: pageSize,
      lastPage: 0,
    } as any);

  return [
    {
      data: newData as any,
      error: result.error,
      loading: result.loading,
      firstLoading,
      response: newResponse,
    },
    execute,
    other,
  ];
};
