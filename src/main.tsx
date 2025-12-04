import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@/redux/store';
import { reportWebVitals } from '@/utils/webVitals';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);

reportWebVitals();
