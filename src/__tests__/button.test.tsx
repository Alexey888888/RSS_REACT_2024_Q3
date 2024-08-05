import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';
import { IButtonProps } from './IButton';
import { useTheme } from '../../context/useTheme';

vi.mock('../../context/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('Button component', () => {
  it('renders button with text', () => {
    const props: IButtonProps = {
      type: 'button',
      text: 'Test click',
      onClick: vi.fn(),
    };

    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
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

    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
    render(<Button {...props} />);
    const buttonElement = screen.getByText(/Test click/i);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('applies the correct class for light theme', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    const props: IButtonProps = {
      type: 'button',
      text: 'Test click',
      onClick: vi.fn(),
    };

    render(<Button {...props} />);
    const buttonElement = screen.getByText(/Test click/i);
    expect(buttonElement).toHaveClass('button_light');
  });

  it('applies the correct class for dark theme', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });
    const props: IButtonProps = {
      type: 'button',
      text: 'Test click',
      onClick: vi.fn(),
    };
    render(<Button {...props} />);
    const buttonElement = screen.getByText(/Test click/i);
    expect(buttonElement).toHaveClass('button_dark');
  });
});
