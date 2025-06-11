import {
  Box,
  Button,
  ButtonText,
  View,
  Card,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  LinkText,
} from '@gluestack-ui/themed';
import { useAuth } from '@hooks/useAuth';
import { Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { config as themeConfig } from '../../gluestack-style.config';

export default function HomeScreen() {
  const theme = themeConfig.themes.light.colors;

  const { isAuthenticated, login, logout, accessToken } = useAuth();
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Box>
          <Text style={styles.title}>Ultima actualización</Text>
          <Text color={theme.primary} style={styles.Fecha}>
            Ult.Act 25/10/25 10:30 A.M.
          </Text>
        </Box>
        <MaterialIcons
          name="sync"
          size={34}
          style={styles.refresh}
          color={theme.primary}
        />
      </Card>
      <Card style={styles.asignaciones}>
        <HStack
          style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}
        >
          <Box style={styles.icon} className="bg-primary w-10 h-10">
            <MaterialIcons name="assignment" size={24} color={theme.primary} />
          </Box>
          <Box className="flex-1 w-full">
            <Text style={styles.title}>Asignaciones</Text>
            <Text fontWeight="light" color="#525252">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </Text>
          </Box>
          <Box className="w-10 justify-center items-center h-full">
            <MaterialIcons
              name="arrow-forward-ios"
              size={24}
              style={styles.refresh}
              color={theme.primary}
            />
          </Box>
        </HStack>
      </Card>
      <Box>
        <Box className="flex-row justify-between align-center items-center">
          <Text style={styles.title}>Formularios en progreso</Text>
          <Link>
            <LinkText style={styles.verMas}>Ver más</LinkText>
          </Link>
        </Box>
        <Card style={styles.asignaciones} className="mt-4"></Card>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 22,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  card: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  asignaciones: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    height: 100,
  },
  logo: {
    width: 139,
    height: 28.74,
  },
  refresh: {
    position: 'absolute',
    right: 10,
  },
  Fecha: {
    fontSize: 12,
    backgroundColor: '#5FD0DF1A',
    borderRadius: 10,
    padding: 5,
    color: '#5FD0DF',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'center',
    borderWidth: 0.2,
    borderColor: '#5FD0DF',
  },
  icon: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    aspectRatio: 1,
    width: 50,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verMas: {
    fontSize: 12,
    color: '#5FD0DF',

    textDecorationLine: 'underline',
  },
});
