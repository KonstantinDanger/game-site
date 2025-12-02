import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';

import GoBackButton from '@/components/GoBackButton/GoBackButton';
import Loading from '@/components/Loading/Loading';
import { authSelector } from '@/redux/selectors';

import css from './Body.module.css';

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));
const PlayerPage = lazy(() => import('@/pages/PlayerPage/PlayerPage'));
const PlayerListPage = lazy(() => import('@/pages/PlayerListPage/PlayerListPage'));
const MatchPage = lazy(() => import('@/pages/MatchPage/MatchPage'));
const MatchListPage = lazy(() => import('@/pages/MatchListPage/MatchListPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage/LoginPage'));
const LogoutPage = lazy(() => import('@/pages/LogoutPage/LogoutPage'));
const UserProfilePage = lazy(() => import('@/pages/UserProfilePage/UserProfilePage'));

export default function Body() {
  const { pathname } = useLocation();
  const { player } = useSelector(authSelector);
  const bg = useColorModeValue('whiteAlpha.800', 'blackAlpha.900');
  const hasUser = !!player?.id;

  return (
    <Box className={css.body}>
      <Box className={css.content} bgColor={bg}>
        {pathname !== '/' && <GoBackButton />}

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<HomePage />} />

            <Route path='/players' element={<PlayerListPage />} />

            <Route path='/players/:playerId' element={<PlayerPage />} />

            <Route path='/matches' element={<MatchListPage />} />

            <Route path='/matches/:matchId' element={<MatchPage />} />

            <Route path='/register' element={<RegisterPage />} />

            <Route path='/login' element={<LoginPage />} />

            {hasUser && <Route path='/logout' element={<LogoutPage />} />}

            {hasUser && <Route path='/profile' element={<UserProfilePage />} />}

            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
}
