import { Button, Image, useColorMode } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';

export default function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={toggleColorMode}
      variant='ghost'
      colorScheme={colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha'}
    >
      <Image as={colorMode === 'light' ? LuSun : LuMoon} size='20px' color='white' />
    </Button>
  );
}
