import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
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
