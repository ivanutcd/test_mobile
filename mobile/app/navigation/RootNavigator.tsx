import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import GetFormScreen from '../screens/GetFormScreen';
import { useAuth } from '@hooks/useAuth';
import { SQLiteProvider } from 'expo-sqlite';
import ItemModal from '../modal';
import HomeScreen from '../screens/HomeScreen';
import { createDbIfNeeded } from '../../database/database';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <SQLiteProvider databaseName="utcd-forms.db" onInit={createDbIfNeeded}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Tabs" component={TabNavigator} />
              <Stack.Screen name="GetForm" component={GetFormScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="modal"
                component={ItemModal}
                options={{
                  presentation: 'modal',
                }}
              />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
