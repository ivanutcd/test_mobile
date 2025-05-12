import Loadable from '@common/ui-component/Loadable.tsx';
import { lazy } from 'react';

const CrearFormulario = Loadable(lazy(() => import('./pagina.tsx')));

export default CrearFormulario;
