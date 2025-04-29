import { httpApi } from '../../../../http/http-api.ts';

export const eliminarFactura = async (id:string) => {
  return httpApi.delete(`facturas/${id}`);
};
