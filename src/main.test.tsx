import { describe, it, expect } from 'vitest';
import { renderApp } from '../src/main';

describe('main.tsx', () => {
  it('renders without crashing', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    expect(() => {
      renderApp();
    }).not.toThrow();
  });
});
