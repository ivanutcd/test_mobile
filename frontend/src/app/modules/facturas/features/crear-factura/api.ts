import { httpApi } from '../../../../http/http-api.ts';
import { Factura } from '../../models/factura.model.ts';

export const crearFactura = async (values: Factura) => {
  return httpApi.post('facturas', values);
};
