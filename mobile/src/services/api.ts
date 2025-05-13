import * as SecureStore from 'expo-secure-store';

export async function fetchProtectedResource(endpoint: string): Promise<any> {
  const accessToken = await SecureStore.getItemAsync('access_token');

  if (!accessToken) {
    throw new Error(
      'No se encontró access token. El usuario no está autenticado.',
    );
  }

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Error al llamar a la API: ${response.status} - ${errorBody}`,
    );
  }

  return await response.json();
}
