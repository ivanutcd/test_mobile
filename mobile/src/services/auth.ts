import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import {
  AUTH_SERVER,
  CLIENT_ID,
  REDIRECT_URI_MOBILE,
  REDIRECT_URI_WEB,
  SCOPES,
} from '@env';
import * as Linking from 'expo-linking';

const isWeb = Platform.OS === 'web';

const redirectUri = isWeb
  ? REDIRECT_URI_WEB
  : AuthSession.makeRedirectUri({
      native: REDIRECT_URI_MOBILE,
    });

const discovery = {
  authorizationEndpoint: `${AUTH_SERVER}/connect/authorize`,
  tokenEndpoint: `${AUTH_SERVER}/connect/token`,
  revocationEndpoint: `${AUTH_SERVER}/connect/logout`,
};

const scopes = SCOPES.split(' ');
const clientId = CLIENT_ID;

export async function login() {
  const authRequest = new AuthSession.AuthRequest({
    clientId,
    scopes,
    redirectUri,
    usePKCE: true,
  });

  await authRequest.makeAuthUrlAsync(discovery);

  const result = await authRequest.promptAsync(discovery);

  if (result.type !== 'success') {
    console.warn('Inicio de sesión cancelado o fallido');
    return null;
  }

  const code = result.params.code;

  const tokenResponse = await fetch(discovery.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=authorization_code&code=${code}&client_id=${clientId}&redirect_uri=${redirectUri}&code_verifier=${authRequest.codeVerifier}`,
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    console.error('Error al obtener el token:', tokenData);
    return null;
  }

  await SecureStore.setItemAsync('access_token', tokenData.access_token);

  return tokenData;
}
