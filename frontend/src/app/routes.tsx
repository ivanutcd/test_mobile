import { RouteObject } from 'react-router-dom';
import HomeModule from './modules/home';
import FormularioModule from './modules/formulario';
import FormularioDinamicoModule from './modules/formularioDinamico';


export const AppRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <HomeModule />,
  },
  {
    path: 'formularios/',
    element: <FormularioModule />,
  },
  {
    path: 'formularios-dinamicos/',
    element: <FormularioDinamicoModule />,
  },
];
