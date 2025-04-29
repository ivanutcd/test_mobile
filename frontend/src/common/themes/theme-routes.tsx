// ==============================|| ROUTING RENDER ||============================== //

import { RouteObject, useRoutes } from 'react-router-dom';
import { AppRoutes } from '../../app/routes.tsx';
import { RequiredResetPasswordLayer } from '../../app/modules/seguridad/common/RedirectLayer.tsx';
import { SimpleLayout } from '@layout/seguridad';
import MainLayout from '@layout/main-layout';
import ReinicioObligatorioContrasena from '../../app/modules/seguridad/reinicio-obligatorio-contrasena';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { AuthSession } from '@common/security/auth-session.tsx';
import { AuthRoute } from '@common/security/auth-route.tsx';
import { IdleTimer } from '@common/security/Idle-timer.tsx';
import { QueryParamProvider } from 'use-query-params';
import Tipografia from '../../app/styles/typography.tsx';
import { Redirect } from 'app/modules/seguridad/common/redirect.tsx';
import { Silent } from 'app/modules/seguridad/common/silent.tsx';

//TODO: Enner: por un problema en la inicializacion de interceptores de axios no se reutiliza el codigo de /security/auth-layer.tsx
const ReinicioContrasenaRoute: RouteObject = {
  path: '/reinicio-contrasena',
  element: (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthSession>
        <AuthRoute>
          <SimpleLayout>
            <ReinicioObligatorioContrasena />
          </SimpleLayout>
        </AuthRoute>
      </AuthSession>
    </QueryParamProvider>
  ),
};

const MainLayoutRoutes: RouteObject = {
  path: '/',
  element: (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthSession>
        <AuthRoute>
          <IdleTimer>
            <RequiredResetPasswordLayer>
              <MainLayout />
            </RequiredResetPasswordLayer>
          </IdleTimer>
        </AuthRoute>
      </AuthSession>
    </QueryParamProvider>
  ),

  errorElement: <h1></h1>,
  children: [
    {
      path: '/tipografia',
      element: <Tipografia />,
    },
    ...AppRoutes,
  ],
};
export const ThemesRoutes: RouteObject[] = [
  {
    path: '/redirect',
    element: <Redirect />,
  },
  {
    path: '/silent',
    element: <Silent />,
  },

  ReinicioContrasenaRoute,
  MainLayoutRoutes,
];
export default function ThemeRoutes() {
  return useRoutes(ThemesRoutes);
}
