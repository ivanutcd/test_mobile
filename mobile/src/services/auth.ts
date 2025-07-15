import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { useUserStore} from '../store/useUserStore';





import {
  AUTH_SERVER,
  CLIENT_ID,
  REDIRECT_URI_MOBILE,
  REDIRECT_URI_WEB,
  SCOPES,
} from '@env';

console.log(AuthSession.makeRedirectUri({ native: 'utcd-forms://redirect' }));

const redirectUri =
  Platform.OS === 'web'
    ? REDIRECT_URI_WEB
    : AuthSession.makeRedirectUri({
        native: REDIRECT_URI_MOBILE,
      });



const discovery = {
  authorizationEndpoint: `${AUTH_SERVER}/connect/authorize`,
  tokenEndpoint: `${AUTH_SERVER}/connect/token`,
  revocationEndpoint: `${AUTH_SERVER}/connect/logout`,
};

const scopes = SCOPES?.split(' ');
const clientId = CLIENT_ID;

interface DecodedToken {
  iss: string;
  exp: number;
  iat: number;
  aud: string[];
  scope: string;
  jti: string;
  sub: string;
  name: string;
  email: string;
  role: string[];
  permissions: string[];
  oi_prst: string;
  oi_au_id: string;
  client_id: string;
  oi_tkn_id: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
}

export async function login() {
  console.log('login--------Service------------------------');


  try {
    const authRequest = new AuthSession.AuthRequest({
      clientId,
      scopes,
      redirectUri,
      usePKCE: true,
    });
    console.log(authRequest, 'authRequest');

    const result = await authRequest.promptAsync(
      discovery,
      Platform.OS === 'android'
        ? ({ useProxy: true } as any)
        : undefined
    );
    console.log(result, 'result');
    if (result.type !== 'success') {
      console.warn('Inicio de sesión cancelado o fallido');
      return null;
    }

    const code = result.params.code;

    const tokenResponse = await fetch(discovery.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        redirect_uri: redirectUri,
        code_verifier: authRequest.codeVerifier ?? '',
      }).toString(),
    });

    console.log(tokenResponse, 'tokenResponse');

    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      const decoded: DecodedToken = jwtDecode(tokenData.access_token);
      console.log(decoded, 'decoded');
      console.log("Token decodificado:", decoded);
      const user = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        sub: decoded.sub,
        oi_au_id: decoded.oi_au_id,
        oi_tkn_id: decoded.oi_tkn_id,
        token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        id_token: tokenData.id_token,
      }
      useUserStore.getState().setUser(user);
    }

    if (!tokenResponse.ok) {
      console.error('Error al obtener el token:', tokenData);
      return null;
    }

    await SecureStore.setItemAsync('access_token', tokenData.access_token);

    console.log(tokenData, 'tokenData');
    return tokenData;
  } catch (err) {
    console.error('Login error:', err);
    return null;
  }
}
