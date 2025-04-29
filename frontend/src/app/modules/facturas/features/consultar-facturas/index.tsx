import Loadable from '@common/ui-component/Loadable.tsx';
import { lazy } from 'react';

const ConsultarFacturas = Loadable(lazy(() => import('./pagina.tsx')));

export default ConsultarFacturas;
