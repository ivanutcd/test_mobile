import { httpApi } from '../../../../http/http-api.ts';
import { Factura } from '../../models/factura.model.ts';

export const editarFactura = async (values: Factura) => {
  return httpApi.put(`facturas/${values.id}`, values);
};
