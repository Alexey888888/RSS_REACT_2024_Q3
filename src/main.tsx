import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { Provider } from 'react-redux';
import { loadSelectedItems, store } from './redux/store.ts';
import { setSelectedItems } from './redux/slices/selectedItemsSlice.ts';

import '../node_modules/modern-normalize/modern-normalize.css';
import './index.scss';

const savedSelectedItems = loadSelectedItems();
store.dispatch(setSelectedItems(savedSelectedItems));

export const renderApp = (element: HTMLElement | null) => {
  if (element) {
    ReactDOM.createRoot(element).render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    );
  }
};

renderApp(document.getElementById('root'));
