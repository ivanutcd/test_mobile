import { useSessionState } from '@common/security/store.ts';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
export const RequiredResetPasswordLayer = ({ children }: any) => {
  const navigate = useNavigate();
  const user = useSessionState(state => state.user);
  const resetPassword = user?.resetPassword;

  useEffect(() => {
    if (resetPassword) {
      navigate('/reinicio-contrasena');
    }
  }, [resetPassword]);

  if (resetPassword) {
    return <></>;
  }
  return children;
};
