import { describe, it, expect } from 'vitest';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

describe('index.tsx', () => {
  it('renders without crashing', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    expect(() => {
      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </React.StrictMode>,
      );
    }).not.toThrow();
  });
});
