import { Box, Text } from '@gluestack-ui/themed';

export default function HomeScreen() {
  return (
    <Box
      flex={1}
      justifyContent="flex-start"
      alignItems="stretch"
      style={{ padding: 16, gap: 16 }}
      className="bg-white"
    >
      <Text>Home</Text>
    </Box>
  );
}
