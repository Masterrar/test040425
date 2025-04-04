import React from 'react';
import { createRoot } from 'react-dom/client'; // Импортируйте createRoot
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Создайте корень

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);