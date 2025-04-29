import { RouteObject } from 'react-router-dom';


import HomeModule from './modules/home';
import FacturasModule from './modules/facturas';



export const AppRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <HomeModule />,
  },
  {
    path: 'facturas/*',
    element: <FacturasModule />,
  }
];
