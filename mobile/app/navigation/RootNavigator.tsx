import React, { useCallback, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@hooks/useAuth';
import { SQLiteProvider } from 'expo-sqlite';
import { createDbIfNeeded } from '../../database/database';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import GetFormScreen from '../screens/GetFormScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemModal from '../modal';
import { Box, Text, View, VStack } from '@gluestack-ui/themed';
import useNetworkStatus from '../../hooks/useNetworkStatus';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const networkStatus = useNetworkStatus();
  const { isAuthenticated } = useAuth();

  const header = useCallback(
    () => (
      <View style={styles.header}>
        <SafeAreaView>
          <VStack>
            <Box style={styles.headerBox}>
              <Image
                source={require('../../assets/images/logoEnee.png')}
                style={styles.logo}
              />
            </Box>
            <Box
              style={[
                styles.networkBox,
                {
                  backgroundColor: networkStatus.isConnected
                    ? '#8BFE95'
                    : '#FF0000',
                },
              ]}
            >
              <Text color="black" fontSize={12}>
                {networkStatus.isConnected ? 'En Linea' : 'Sin Conexión'}
              </Text>
            </Box>
          </VStack>
        </SafeAreaView>
      </View>
    ),
    [networkStatus],
  );

  const screens = useMemo(() => {
    if (isAuthenticated) {
      return (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: true, header }}
          />
          <Stack.Screen
            name="GetForm"
            component={GetFormScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="modal"
            component={ItemModal}
            options={{ presentation: 'modal' }}
          />
        </>
      );
    }
    return <Stack.Screen name="Login" component={LoginScreen} />;
  }, [isAuthenticated, header]);

  return (
    <SQLiteProvider databaseName="utcd-forms.db" onInit={createDbIfNeeded}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {screens}
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 139,
    height: 28.74,
    position: 'absolute',
    margin: 'auto',
    left: '50%',
    top: '50%',
    transform: [{ translateX: '-50%' }],
  },
  headerBox: {
    height: 60,
    transform: [{ translateY: -10 }],
  },
  networkBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30,
  },
});

export default RootNavigator;
