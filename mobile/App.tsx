import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '@hooks/useAuth';

export default function App() {
  const { isAuthenticated, login, logout /*, accessToken*/ } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Estado: {isAuthenticated ? 'Autenticado' : 'No autenticado'}</Text>

      <Button title="Login" onPress={login} />
      <Button title="Logout" onPress={logout} />

      {/* {accessToken && <Text>Token: {accessToken.substring(0, 20)}...</Text>} */}
    </View>
  );
}
