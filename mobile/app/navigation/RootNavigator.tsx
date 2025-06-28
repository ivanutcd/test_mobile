import React, { useCallback, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@hooks/useAuth';

import { Image, SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import GetFormScreen from '../screens/GetFormScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemModal from '../modal';
import { Pressable } from 'react-native';
import { Box, Text, View, VStack } from '@gluestack-ui/themed';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import { MaterialIcons } from '@expo/vector-icons';
import { config as themeConfig } from '../../gluestack-style.config';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const theme = themeConfig.themes.light.colors;
  const networkStatus = useNetworkStatus();
  const { isAuthenticated, logout } = useAuth();

  const header = useCallback(
    () => (
      <View style={styles.header}>
        <SafeAreaView>
          <VStack>
            <Box style={styles.headerBox}>
              <MaterialIcons
                name="account-circle"
                size={32}
                color={theme.primary}
              />
              <Image
                source={require('../../assets/images/logoEnee.png')}
                style={styles.logo}
              />
              <Pressable onPress={() => logout()}>
                <MaterialIcons name="logout" size={24} color={theme.primary} />
              </Pressable>
            </Box>

            <Box
              style={[
                styles.networkBox,
                {
                  backgroundColor: networkStatus.isConnected
                    ? '#8BFE95'
                    : '#FF8F9B',
                },
              ]}
            >
              <Text color="black" fontSize={12}>
                {networkStatus.isConnected ? 'En Linea' : 'Sin Conexión'}
              </Text>
              <MaterialIcons
                name={networkStatus.isConnected ? 'wifi' : 'wifi-off'}
                size={14}
                color="black"
                style={{ marginLeft: 5 }}
              />
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
    // <SQLiteProvider databaseName="utcd-forms.db" onInit={createDbIfNeeded}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {screens}
      </Stack.Navigator>
    </NavigationContainer>
    // </SQLiteProvider>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 10,
  },
  networkBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 24,
  },
});

export default RootNavigator;
