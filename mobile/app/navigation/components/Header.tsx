import React from 'react';
import { SafeAreaView, StyleSheet, Image, Pressable } from 'react-native';
import { Box, Text, View, VStack } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import useNetworkStatus from '@/hooks/useNetworkStatus';
import { useAuth } from '@hooks/useAuth';
import { config as themeConfig } from '@/gluestack-style.config';

const Header = () => {
  const { logout } = useAuth();
  const theme = themeConfig.themes.light.colors;
  const networkStatus = useNetworkStatus();

  return (
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
              source={require('@/assets/images/logoEnee.png')}
              style={styles.logo}
            />
            <Pressable onPress={logout}>
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
              {networkStatus.isConnected ? 'En Línea' : 'Sin Conexión'}
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
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 139,
    height: 28.74,
    marginTop: 5,
  },
  headerBox: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 10,
  },
  networkBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 36,
    marginTop: 4,
  },
});

export default Header;
