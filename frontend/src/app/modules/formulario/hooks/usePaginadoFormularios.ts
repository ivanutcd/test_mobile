import { httpApi } from 'app/http/http-api';
import { useState } from "react";
import { usePaginate } from "@common/hooks/use-paginate";
import { SearchProps } from '../features/consultar-formularios/props';

export const usePaginadoFormularios = <T>(initialValues: any = {}) => {
  const [search, setSearch] = useState<SearchProps>(
    initialValues as SearchProps,
  );

      const [{data,loading, error},recargarOriginal] = usePaginate<T>(
        httpApi,
        `formulario`,
        search,
      );
    
      const recargar = () => {
        setSearch({});
        recargarOriginal({}); 
      }
    
      return { data, filtros: search, buscar: setSearch, recargar, loading, error };
    };
   
    export default usePaginadoFormularios;