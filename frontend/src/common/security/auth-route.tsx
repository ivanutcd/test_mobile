import { useEffect } from 'react';
import { useSessionState } from '@common/security/store.ts';
import { NotAllowed } from '@common/ui-component/NotAllowed';

interface Props {
  access?: string[];
  children: any;
}
export const AuthRoute = ({ children, access }: Props) => {
  //const { login } = useSessionContext();
  const user = useSessionState(x => x.user);

  const login = useSessionState(x => x.login);
  const isNotAuthenticated = user == undefined;
  useEffect(() => {
    if (isNotAuthenticated) {
      login();
    }
  }, [isNotAuthenticated]);

  if (isNotAuthenticated) {
    return <>No autenticado</>;
  }

  const componentAllowed = access ? access.filter(x => x.length === 0) : [];

  if (componentAllowed.length === 0 && access) {
    return <NotAllowed />;
  }

  return children;
};
