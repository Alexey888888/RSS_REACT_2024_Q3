import { renderApp } from './main';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { App } from './App';
import { render } from '@testing-library/react';

describe('main.tsx', () => {
  it('renders the App without crashing', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    renderApp(root);
    const app = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(app.container).toBeTruthy();
    document.body.removeChild(root);
  });
});
