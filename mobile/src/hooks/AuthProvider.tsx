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
  accessToken: string | null;
  isAuthenticated: boolean;
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
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        console.log(token, 'token--------------------------------');
        setAccessToken(token);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading token:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = useCallback(async () => {
    const result = await loginService();
    console.log(result, 'result--------------------------------');
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
    setAccessToken(null);
    setIsAuthenticated(false);
    console.log('logout--------------------------------');
    await insertarLogEvento(
      db,
      '',
      'Logout',
      'Cierre de sesión',
      'El usuario cerró sesión',
    );
    await logoutAndRedirectToSSOLogin();
    await SecureStore.deleteItemAsync('access_token');
  }, [db]);

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
