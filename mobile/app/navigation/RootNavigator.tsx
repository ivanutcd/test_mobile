import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/src/context/AuthProvider';
import LoginScreen from '../screens/LoginScreen';
import GetFormScreen from '../screens/GetFormScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemModal from '../modal';
import Header from './components/Header';
import Profile from '../screens/Profile';
import { ActivityIndicator, View } from 'react-native';
import AsignacionesScreen from '../screens/AsignacionesScreen';
import FormRenderScreen from '../screens/FormRenderScreen';
const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ header: () => <Header btnBack={false} title="Inicio" /> }}
    />
    <Stack.Screen
      name="GetForm"
      component={GetFormScreen}
      options={{ header: () => <Header btnBack={true} title="Formulario" /> }}
    />
    <Stack.Screen
      name="modal"
      component={ItemModal}
      options={{ presentation: 'modal', header: () => <Header btnBack={false} title="Formulario" /> }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{  header: () => <Header btnBack={true} title="Perfil Usuario" />  }}
    />
    <Stack.Screen
      name="Asignaciones"
      component={AsignacionesScreen}
      options={{  header: () => <Header btnBack={true} title="Clientes Asignados" />  }}
    />
    <Stack.Screen
      name="FormRenderScreen"
      component={FormRenderScreen}
      options={{  header: () => <Header btnBack={true} title="Formulario de Asignacion" />  }}
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
