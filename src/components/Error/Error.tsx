import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { IoIosWarning } from 'react-icons/io';

export default function Error() {
  const color = useColorModeValue('red.600', 'red.400');
  return (
    <Flex justifyContent='center' alignItems='center' flexDir='column' gap='24px'>
      <Image as={IoIosWarning} size='64px' color={color} />

      <Text fontWeight={500} color={color}>
        Something went wrong
      </Text>
    </Flex>
  );
}
