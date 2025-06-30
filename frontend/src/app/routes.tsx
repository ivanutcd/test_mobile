import { Navigate, RouteObject } from 'react-router-dom';
import FormularioModule from './modules/formulario';

export const AppRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <Navigate to="/formularios" />,
  },
  {
    path: 'formularios/*',
    element: <FormularioModule />,
  },
];
