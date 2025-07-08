import React from 'react';
import { SafeAreaView, StyleSheet, Image, Pressable } from 'react-native';
import { Box, Text, View, VStack } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import useNetworkStatus from '@/hooks/useNetworkStatus';
import { config as themeConfig } from '@/gluestack-style.config';
import { useNavigation } from '@react-navigation/native';

const Header = ({ btnBack, title }: { btnBack: boolean, title: string }) => {

  const navigation = useNavigation();


  const theme = themeConfig.themes.light.colors;
  const networkStatus = useNetworkStatus();
  const goToProfile = () => {

    navigation.navigate('Profile' as never);
    console.log('goToProfile');
  };
  return (
    <View style={styles.header}>
      <SafeAreaView>
        <VStack>
          <Box style={styles.headerBox}>
            {btnBack && (
              <Pressable onPress={() => navigation.goBack()} style={{
                position: 'absolute',
                left: 10,
                bottom: 0,
              }}>
                <MaterialIcons
                  name="chevron-left"
                  size={32}
                  color={'#000'}
                />
              </Pressable>
            )}
            {!btnBack && (
              <Pressable onPress={goToProfile} style={{
                position: 'absolute',
                left: 10,
                bottom: 0,
              }}>
                <MaterialIcons
                  name="account-circle"
                  size={32}
                  color={theme.primary}
                />
              </Pressable>
            )}
            {btnBack && (
              <Box style={styles.titleBox}>
                <Text style={styles.title}>{title}</Text>
              </Box>
            )}

            {!btnBack && (
              <Image
                source={require('@/assets/images/logoEnee.png')}
                style={styles.logo}
              />
            )

            }
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
    position: 'absolute',
    width: 138,
    height: 28,
    // left: '52%',
    // transform: 'translate(-50%, -50%)',

    zIndex: 1000,
  },
  headerBox: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'relative',
    gap: 10,
  },
  networkBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30,
    marginTop: 4,
  },
  titleBox: {
    position: 'absolute',
    left: '16%',
    bottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Header;
