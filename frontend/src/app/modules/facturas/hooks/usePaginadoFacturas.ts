import { httpApi } from 'app/http/http-api';
import { Factura } from '../models/factura.model.ts';
import { usePaginate } from '@common/hooks/use-paginate';
import { useState } from 'react';
import { FacturaFiltros } from '../models/factura-filtros.model.ts';


export const usePaginadoFacturas = (
) => {
  const [search, setSearch] = useState<Partial<FacturaFiltros>>({});

  const [{data,loading},recargar] = usePaginate<Factura>(
    httpApi,
    `facturas`,
    search,
  );

  const buscar = (values:Partial<FacturaFiltros>) => {
    setSearch(values);
  };

  return { data ,loading, filtros: search, buscar, recargar};
};
