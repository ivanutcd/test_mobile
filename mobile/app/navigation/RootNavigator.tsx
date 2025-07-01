import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/src/context/AuthProvider';
import LoginScreen from '../screens/LoginScreen';
import GetFormScreen from '../screens/GetFormScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemModal from '../modal';
import Header from './components/Header';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ header: () => <Header /> }}
    />
    <Stack.Screen
      name="GetForm"
      component={GetFormScreen}
      options={{ header: () => <Header /> }}
    />
    <Stack.Screen
      name="modal"
      component={ItemModal}
      options={{ presentation: 'modal', header: () => <Header /> }}
    />
  </Stack.Navigator>
);

const UnauthenticatedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { isAuthenticated, loading } = useAuth();
  console.log('[RootNavigator] Estado:', { isAuthenticated, loading });
  // Mostrar pantalla de carga mientras se verifica el token
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
