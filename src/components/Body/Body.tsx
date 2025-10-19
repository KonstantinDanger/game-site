import { Route, Routes, useLocation } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';

import HomePage from 'pages/HomePage/HomePage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import PlayerPage from '@/pages/PlayerPage/PlayerPage';
import PlayerListPage from 'pages/PlayerListPage/PlayerListPage';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import GoBackButton from 'components/GoBackButton/GoBackButton';

import css from './Body.module.css';
import UserProfilePage from '@/pages/UserProfilePage/UserProfilePage';

export default function Body() {
  const { pathname } = useLocation();
  const bg = useColorModeValue('whiteAlpha.700', 'blackAlpha.900');

  return (
    <Box className={css.body}>
      <Box className={css.content} bgColor={bg}>
        {pathname !== '/' && <GoBackButton />}

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/players' element={<PlayerListPage />} />
          <Route path='/player/:playerId' element={<PlayerPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<UserProfilePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
