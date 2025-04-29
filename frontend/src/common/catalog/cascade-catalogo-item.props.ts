import { CatalogoItem } from './catalogo-item.model.ts';

export interface CascadeCatalogoItemProps {
  catalogoPrincipal: string;
  items: CatalogoItem[];
  catalogoDependiente: any;
  predicate?: (principal: CatalogoItem, valueToCompare: string) => boolean;
}
