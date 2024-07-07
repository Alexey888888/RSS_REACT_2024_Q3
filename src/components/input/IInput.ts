import { ChangeEvent } from 'react';

export interface IInputProps {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
