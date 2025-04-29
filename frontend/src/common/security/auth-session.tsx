import { Loading } from '@common/ui-component/Loading';
import { useEffect, useState } from 'react';
import { useSessionState } from './store.ts';
import auth from './auth.ts';

interface Props {
  children: any;
}

export const useSession = () => {
  const [loginInProgress, SetloginInProgress] = useState(true);
  const accesToken = useSessionState(x => x.accessToken);
  const saveSession = useSessionState(x => x.saveSession);

  useEffect(() => {
    const CurrentUserData = async () => {
      const user = await auth.getUser();

      if (user && !user.expired) {
        saveSession(user.access_token, user.refresh_token, user.profile);
      }

      SetloginInProgress(false);
    };

    CurrentUserData();
  }, []);

  return { token: accesToken, loginInProgress: loginInProgress };
};

export const AuthSession = ({ children }: Props) => {
  //const { token, loginInProgress } = useSessionContext();
  const session = useSession();

  if (session.loginInProgress) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return children;
};
