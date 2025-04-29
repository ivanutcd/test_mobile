import Loadable from '@common/ui-component/Loadable.tsx';
import { lazy } from 'react';

const ReinicioContrasenaPerfil = Loadable(lazy(() => import('./pagina')));

export default ReinicioContrasenaPerfil;
