import { RouteObject } from 'react-router-dom';
import HomeModule from './modules/home';
import FormularioModule from './modules/formulario';



export const AppRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <HomeModule />,
  },
  {
    path: 'formularios/',
    element: <FormularioModule />,
  },
];
