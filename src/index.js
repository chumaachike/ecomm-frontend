import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const container = document.getElementById('root');
const root = createRoot(container); // Create root with container element

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
