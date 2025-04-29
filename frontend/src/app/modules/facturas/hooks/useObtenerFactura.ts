import { httpApi } from 'app/http/http-api.ts';
import { Factura } from 'app/modules/facturas/models/factura.model.ts';

import { useGetWith } from '@common/hooks/use-get-with.ts';


export const UseObtenerFactura =  (id?:string):{ data?: Factura, loading: boolean, error: any } => {

  const [{data,loading,error}]= useGetWith<Factura>(httpApi, {
    url: `/facturas/${id}`,
  });

  return {data,loading,error};

}
