import { CatalogoItem } from './catalogo-item.model.ts';

export interface Catalogo {
  [key: string]: CatalogoItem[];
}
