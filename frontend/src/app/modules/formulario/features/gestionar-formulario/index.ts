import Loadable from '@common/ui-component/Loadable.tsx';
import { lazy } from 'react';

const GestionarFormulario = Loadable(lazy(() => import('./pagina.tsx')));

export default GestionarFormulario;
