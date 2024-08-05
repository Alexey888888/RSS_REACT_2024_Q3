import { renderApp } from './main';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { App } from './App';
import { render } from '@testing-library/react';
import { act } from 'react';

describe('main.tsx', () => {
  it('renders the App without crashing', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    act(() => {
      renderApp(root);
      render(
        <Provider store={store}>
          <App />
        </Provider>,
      );
    });

    const app = document.querySelector('#root');
    expect(app).toBeTruthy();

    document.body.removeChild(root);
  });
});
