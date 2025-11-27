import { authSelector } from '@/redux/selectors';
import { useSelector } from '@/redux/store';
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function UserProfileButton() {
  const { player } = useSelector(authSelector);
  const hasAccess = !!player?.id;
  const color = useColorModeValue('gray.700', 'gray.300');
  return (
    <Menu>
      <MenuButton as={Avatar} size='sm' cursor='pointer' />
      <MenuList minW='100px'>
        <MenuItem as={Link} to={hasAccess ? '/profile' : '/login'} color={color}>
          {hasAccess ? 'My Profile' : 'Log In'}
        </MenuItem>

        <MenuItem as={Link} to={hasAccess ? '/logout' : '/register'} color={color}>
          {hasAccess ? 'Log Out' : 'Sign Up'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
