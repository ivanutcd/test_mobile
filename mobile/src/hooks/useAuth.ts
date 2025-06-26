import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { login } from '@services/auth';
import { logoutAndRedirectToSSOLogin } from '@services/authLogout';
import { insertarLogEvento } from '../utils/dbLogger';
import { useSQLiteContext } from 'expo-sqlite';
interface AuthData {
  accessToken: string | null;
  isAuthenticated: boolean;
}

export function useAuth() {
  const db = useSQLiteContext();
  const [auth, setAuth] = useState<AuthData>({
    accessToken: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('access_token');
      setAuth({
        accessToken: token,
        isAuthenticated: !!token,
      });
    };
    loadToken();
  }, []);

  const handleLogin = useCallback(async () => {
    const result = await login();
    if (result?.access_token) {
      setAuth({
        accessToken: result.access_token,
        isAuthenticated: true,
      });
      await insertarLogEvento(db, result.id, 'Login', 'Inicio de sesión exitoso', 'El usuario accedió correctamente');
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await logoutAndRedirectToSSOLogin();
    setAuth({
      accessToken: null,
      isAuthenticated: false,
    });
    await insertarLogEvento(db, "", 'Logout', 'Cierre de sesión', 'El usuario cerró sesión');
  }, []);

  return {
    ...auth,
    login: handleLogin,
    logout: handleLogout,
  };
}
