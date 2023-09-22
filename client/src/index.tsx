import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';
import GlobalStyle from './Globalstyle';
import store from './store/index';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { Analytics } from '@vercel/analytics/react';

import { HelmetProvider } from 'react-helmet-async';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
    <Analytics />
  </>,
);
