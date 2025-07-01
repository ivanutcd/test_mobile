import * as SecureStore from 'expo-secure-store';
import * as Linking from 'expo-linking';
import { AUTH_SERVER, REDIRECT_URI_MOBILE, SCOPES } from '@env';

const scopes = encodeURIComponent(SCOPES);
const logoutEndpoint = `${AUTH_SERVER}/connect/logout`;

export async function logoutAndRedirectToSSOLogin() {
  console.log('🔒 Access token eliminado');
  await SecureStore.deleteItemAsync('access_token');

  /* const loginUrl = `${AUTH_SERVER}/connect/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI_MOBILE
  )}&response_type=code&scope=${scopes}&prompt=login`;*/

  const url = `${logoutEndpoint}?post_logout_redirect_uri=${encodeURIComponent(
    REDIRECT_URI_MOBILE,
  )}`;
  console.log('➡️ Saliendo al SSO:', url);

  await Linking.openURL(url);
  console.log('🔒 Redirección completada');
  return true;
}
