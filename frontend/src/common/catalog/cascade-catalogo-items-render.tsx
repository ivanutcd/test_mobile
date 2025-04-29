import { useFormContext } from 'react-hook-form';
import { CatalogoItem } from './catalogo-item.model.ts';
import { CascadeCatalogoItemProps } from './cascade-catalogo-item.props.ts';

export const CascadeCatalogsRender: React.FC<CascadeCatalogoItemProps> = ({
  catalogoPrincipal,
  items,
  catalogoDependiente,
  predicate,
}) => {
  const { watch } = useFormContext();
  const principal: CatalogoItem = watch(catalogoPrincipal);
  const newPredicate = predicate
    ? predicate
    : (c: CatalogoItem, y: string) => y === c.id;
  if (principal) {
    const newCatalogos = items.filter(
      x => x.catalogosPrincipales?.some(y => newPredicate(principal, y)),
    );
    return <>{catalogoDependiente(newCatalogos)}</>;
  }
  return <>{catalogoDependiente([])}</>;
};
