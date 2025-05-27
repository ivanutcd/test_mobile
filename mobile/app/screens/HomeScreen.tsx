import { Box, Text } from '@gluestack-ui/themed';
import { FormControl } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button/index';
export default function HomeScreen() {
  return (
    <Box
      flex={1}
      justifyContent="flex-start"
      alignItems="stretch"
      p="$4"
      gap="$4"
      style={{ padding: 16, gap: 16 }}
    >
      <Text color="$primary.500" fontSize={20} fontWeight="bold">
        Lorem
      </Text>
      <FormControl>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          className="bg-white rounded-xl"
        >
          <InputField placeholder="lorem ipsum" />
        </Input>
        d
      </FormControl>
      <Button
        action="primary"
        className="bg-primary-500 rounded-xl"
        variant="solid"
        size="lg"
      >
        <ButtonText>Cerrar Sesión</ButtonText>
      </Button>
    </Box>
  );
}
