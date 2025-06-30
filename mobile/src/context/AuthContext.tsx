// src/context/AuthProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { login as loginService } from '@services/auth';
import { logoutAndRedirectToSSOLogin } from '@services/authLogout';
import { insertarLogEvento } from '../utils/dbLogger';
import { useSQLiteContext } from 'expo-sqlite';

interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const db = useSQLiteContext();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('access_token');
      setAccessToken(token || null);
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = useCallback(async () => {
    const result = await loginService();
    if (result?.access_token) {
      await SecureStore.setItemAsync('access_token', result.access_token);
      setAccessToken(result.access_token);
      setIsAuthenticated(true);
      await insertarLogEvento(
        db,
        result.id,
        'Login',
        'Inicio exitoso',
        'El usuario accedió correctamente',
      );
    }
  }, [db]);

  const logout = useCallback(async () => {
    await logoutAndRedirectToSSOLogin();
    await SecureStore.deleteItemAsync('access_token');
    setAccessToken(null);
    setIsAuthenticated(false);
    await insertarLogEvento(
      db,
      '',
      'Logout',
      'Cierre de sesión',
      'El usuario cerró sesión',
    );
  }, [db]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
