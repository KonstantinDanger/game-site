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
  const { token } = useSelector(authSelector);
  const color = useColorModeValue('gray.700', 'gray.300');
  return (
    <Menu>
      <MenuButton as={Avatar} size='sm' cursor='pointer' />
      <MenuList minW='100px'>
        <MenuItem as={Link} to={token ? '/profile' : '/login'} color={color}>
          {token ? 'My Profile' : 'Log In'}
        </MenuItem>

        <MenuItem as={Link} to={token ? '/logout' : '/register'} color={color}>
          {token ? 'Log Out' : 'Sign Up'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
