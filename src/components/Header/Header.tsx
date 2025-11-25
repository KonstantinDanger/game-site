import { Flex } from '@chakra-ui/react';

import Logo from '@/components/Logo/Logo';
import ColorModeButton from '@/components/ColorModeButton/ColorModeButton';
import UserProfileButton from '@/components/UserProfileButton/UserProfileButton';

import css from './Header.module.css';

export default function Header() {
  return (
    <Flex as='header' zIndex={1} className={css.header}>
      <div className={css.container}>
        <Logo />

        <Flex alignItems='center' gap='24px'>
          <UserProfileButton />
          <ColorModeButton />
        </Flex>
      </div>
    </Flex>
  );
}
