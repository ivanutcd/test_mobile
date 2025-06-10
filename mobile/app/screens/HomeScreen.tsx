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
} from '@gluestack-ui/themed';
import { useAuth } from '@hooks/useAuth';
import { Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function HomeScreen() {
  const { isAuthenticated, login, logout, accessToken } = useAuth();
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <HStack>
          <Heading>Ultima actualización</Heading>
          <Text>10/06/2025</Text>
        </HStack>
        <Ionicons
          name="refresh"
          size={34}
          style={styles.refresh}
          color="primary"
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  card: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 139,
    height: 28.74,
  },
  refresh: {
    position: 'absolute',
    right: 10,
  },
});
