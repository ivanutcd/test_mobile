import { CatalogoItem } from '@common/catalog/catalogo-item.model.ts';

export interface FacturaForm{
  numero: string;
  fecha: Date;
  estatus:CatalogoItem;
}
