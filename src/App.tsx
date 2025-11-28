import { useEffect } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header/Header';
import Body from '@/components/Body/Body';
import Footer from '@/components/Footer/Footer';
import { getCurrentUser } from '@/redux/reducers/auth/asyncThunks';
import { useDispatch } from '@/redux/store';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode='system' />
      <Toaster position='bottom-center' />
      <Header />
      <Body />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
