import { ChangeEvent } from 'react';

export interface IInputProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
