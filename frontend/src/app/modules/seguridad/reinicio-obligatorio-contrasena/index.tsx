import Loadable from '@common/ui-component/Loadable.tsx';
import { lazy } from 'react';

const ReinicioObligatorioContrasena = Loadable(
  lazy(() => import('./pagina.tsx')),
);

export default ReinicioObligatorioContrasena;
