import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../components/input/input';
import React from 'react';

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input type="text" value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = vi.fn();
    render(<Input type="text" value="" onChange={handleChange} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays the correct value', () => {
    render(<Input type="text" value="test value" onChange={() => {}} />);
    expect(screen.getByRole('textbox').getAttribute('value')).toBe('test value');
  });

  it('renders correctly with given props', () => {
    render(<Input type="text" value="test value" onChange={vi.fn()} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeTruthy();
  });
});
