import { useEffect } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import Header from '@/components/Header/Header';
import Body from '@/components/Body/Body';
import Footer from '@/components/Footer/Footer';
import { getMe } from '@/redux/reducers/auth/asyncThunks';
import { useDispatch } from '@/redux/store';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Восстановление сессии при первой загрузке, если есть токен
    const token = localStorage.getItem('auth_token');
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode='system' />
      <Header />
      <Body />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
