import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { login } from '@services/auth';
import { logoutAndRedirectToSSOLogin } from '@services/authLogout';
import { insertarLogEvento } from '../utils/dbLogger';
import { useSQLiteContext } from 'expo-sqlite';

export function useAuth() {
  console.log('useAuth');
  const db = useSQLiteContext();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('access_token');
      setAccessToken(token);
      setIsAuthenticated(Boolean(token));
    };
    loadToken();
  }, []);

  const handleLogin = useCallback(async () => {
    const result = await login();
    console.log(`result`, result);
    if (result?.access_token) {
      setAccessToken(result.access_token);
      setIsAuthenticated(true);
      console.log(`usuario ${result.id}`);
      await insertarLogEvento(
        db,
        result.id,
        'Login',
        'Inicio de sesión exitoso',
        'El usuario accedió correctamente',
      );
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await logoutAndRedirectToSSOLogin();
    setAccessToken(null);
    setIsAuthenticated(false);
    await insertarLogEvento(
      db,
      '',
      'Logout',
      'Cierre de sesión',
      'El usuario cerró sesión',
    );
  }, []);

  return {
    accessToken,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  };
}
