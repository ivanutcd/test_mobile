import { Box, Text } from '@gluestack-ui/themed';

export default function HomeScreen() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" >
      <Text  color="$primary.500">¡Bienvenido a Home!</Text>
    </Box>
  );
}
