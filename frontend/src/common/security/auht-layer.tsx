import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { AuthSession } from '@common/security/auth-session.tsx';
import { AuthRoute } from '@common/security/auth-route.tsx';
import { IdleTimer } from '@common/security/Idle-timer.tsx';
interface Props {
  children: any;
}

export const AuthLayer = ({ children }: Props) => {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthSession>
        <AuthRoute>
          <IdleTimer>{children}</IdleTimer>
        </AuthRoute>
      </AuthSession>
    </QueryParamProvider>
  );
};
