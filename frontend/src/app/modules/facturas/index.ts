import Loadable from '@common/ui-component/Loadable.tsx';
import { lazy } from 'react';

const FacturasModule = Loadable(lazy(() => import('./facturas-routing.tsx')));

export default FacturasModule;
