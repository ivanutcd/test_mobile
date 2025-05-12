import Loadable from '@common/ui-component/Loadable';
import { lazy } from 'react';

const FormularioEditar = Loadable(lazy(() => import('./pagina.tsx')));

export default FormularioEditar;
