

import { Text } from 'react-native';
import { Button,ButtonText } from '@/components/ui/button';
import { useAuth } from '@hooks/useAuth';
import { Box } from '@/components/ui/box';

export default function LoginScreen() {
  const { isAuthenticated, login, logout /*, accessToken*/ } = useAuth();

  return (
    <Box flex={1} gap={10} justifyContent="center" alignItems="center" bg="$white" p="$4">
   <Text>Estado: {isAuthenticated ? 'Autenticado' : 'No autenticado'}</Text>
        <Button size="md"  onPress={login}>
          <ButtonText>Login</ButtonText>
        </Button>
        <Button size="md"  onPress={logout}>
          <ButtonText>Logout</ButtonText>
        </Button>
    </Box>
  );
}
