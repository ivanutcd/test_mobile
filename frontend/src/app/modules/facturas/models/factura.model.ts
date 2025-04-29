import { Auditable } from '@common/models/auditable.ts';

export interface Factura extends Auditable {
  id: string;
  numero: string;
  fechaEmision: Date;
  estadoId: string;
}
