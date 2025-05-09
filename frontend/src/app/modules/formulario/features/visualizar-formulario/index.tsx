import Loadable from '@common/ui-component/Loadable';
import { lazy } from 'react';

const VisualizarFormulario = Loadable(lazy(() => import('./pagina.tsx')));

export default VisualizarFormulario;
