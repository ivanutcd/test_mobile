import Loadable from '@common/ui-component/Loadable.tsx';
import { lazy } from 'react';

const CrearFactura = Loadable(lazy(() => import('./pagina.tsx')));

export default CrearFactura;
