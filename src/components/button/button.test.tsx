import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';
import { IButtonProps } from './IButton';

vi.mock('../../context/useTheme', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

describe('Button component', () => {
  it('renders button with text', () => {
    const props: IButtonProps = {
      type: 'button',
      text: 'Test click',
      onClick: vi.fn(),
    };

    render(<Button {...props} />);
    const buttonElement = screen.getByText(/Test click/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClickMock = vi.fn();
    const props: IButtonProps = {
      type: 'button',
      text: 'Test click',
      onClick: onClickMock,
    };

    render(<Button {...props} />);
    const buttonElement = screen.getByText(/Test click/i);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
