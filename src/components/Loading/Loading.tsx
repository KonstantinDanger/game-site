import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react';

export default function Loading() {
  const color = useColorModeValue('purple.700', 'purple.400');
  return (
    <Flex justifyContent='center' alignItems='center'>
      <Spinner color={color} size='xl' />
    </Flex>
  );
}
