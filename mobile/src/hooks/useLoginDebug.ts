// src/hooks/useLoginDebug.ts

import * as AuthSession from 'expo-auth-session';
import { useEffect } from 'react';
import { AUTH_SERVER, CLIENT_ID, REDIRECT_URI, SCOPES } from '@env';

export function useLoginDebug() {
  useEffect(() => {
    const runDebugLogin = async () => {
      console.log('🚀 Iniciando prueba de login...');

      const discovery = {
        authorizationEndpoint: `${AUTH_SERVER}/connect/authorize`,
        tokenEndpoint: `${AUTH_SERVER}/connect/token`,
        revocationEndpoint: `${AUTH_SERVER}/connect/logout`,
      };

      const authRequest = new AuthSession.AuthRequest({
        clientId: CLIENT_ID,
        scopes: SCOPES.split(' '),
        redirectUri: REDIRECT_URI,
        usePKCE: true,
      });

      console.log('📤 AuthRequest preparado:', authRequest);
      console.log('🔗 redirectUri usado:', REDIRECT_URI);

      try {
        console.dir(discovery);
        const result = await authRequest.promptAsync(discovery);
        console.dir(result);
        console.log('✅ Resultado del promptAsync:', result);

        if (result.type !== 'success') {
          console.warn('⚠️ Login fallido o cancelado');
          return;
        }
        //navegador desde la app.. guardar estados.
        const code = result.params.code;
        console.log('🔐 Authorization code recibido:', code);

        const tokenResponse = await fetch(discovery.tokenEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `grant_type=authorization_code&code=${code}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code_verifier=${authRequest.codeVerifier}`,
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
          console.error('❌ Error al obtener token:', tokenData);
        } else {
          console.log('✅ Token recibido:', tokenData);
        }
      } catch (error) {
        console.error('❗ Error inesperado durante el login:', error);
      }
    };

    runDebugLogin();
  }, []);
}
//react-native-app-auth
