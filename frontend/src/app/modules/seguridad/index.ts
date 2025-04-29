import Loadable from '@common/ui-component/Loadable.tsx';
import { lazy } from 'react';

const SeguridadModule = Loadable(lazy(() => import('./seguridad-routing.tsx')));

export default SeguridadModule;
