import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LayoutWrapper } from '../app/layout';

describe('LayoutWrapper Component', () => {
  it('renders children correctly', () => {
    const childrenText = 'text';

    render(
      <LayoutWrapper>
        <div>{childrenText}</div>
      </LayoutWrapper>,
    );

    expect(screen.getByText(childrenText)).toBeTruthy();
  });
});
