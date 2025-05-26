import { Text } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useAuth } from '@hooks/useAuth';
import { Box } from '@/components/ui/box';

export default function LoginScreen() {
  const { isAuthenticated, login, logout /*, accessToken*/ } = useAuth();

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg="$white"
      p="$4"
    >
      <Text>Estado: {isAuthenticated ? 'Autenticado' : 'No autenticado'}</Text>
      <Button
        size="md"
        action="primary"
        variant="solid"
        onPress={login}
        style={{ borderRadius: 10 }}
      >
        <ButtonText>Login</ButtonText>
      </Button>
      <Button
        size="md"
        action="primary"
        variant="solid"
        onPress={logout}
        style={{ borderRadius: 10 }}
      >
        <ButtonText>Logout</ButtonText>
      </Button>
    </Box>
  );
}
